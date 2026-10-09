// Google Apps Script web app that appends playtest signup emails to a Sheet
// and posts a notification for every new signup to a Discord channel.
//
// Setup:
// 1. Create a Google Sheet (e.g. "HoldStrong Playtest Signups") with a header
//    row: Timestamp | Email
// 2. In the Sheet, open Extensions > Apps Script, delete the placeholder code
//    and paste this file's contents. Save.
// 3. SHARED_TOKEN below must match PLAYTEST_SIGNUP_TOKEN in
//    src/scripts/holdstrong.ts. This is not a real secret (it ships in the
//    public JS bundle either way) — it only filters out scanners/bots that hit
//    the URL without reading the page's JS. Change both together or neither.
// 4. Discord (optional): in the Discord channel open Edit Channel >
//    Integrations > Webhooks > New Webhook and copy its URL. In Apps Script open
//    Project Settings > Script Properties and add DISCORD_WEBHOOK_URL with that
//    URL. The webhook URL IS a secret — anyone holding it can post to the
//    channel — so it lives only in the Script Properties, never in this file.
//    Without the property, signups are stored as before and nothing is posted.
//    Run testDiscordNotification() once from the editor to check the setup.
// 5. Deploy > New deployment > select type "Web app".
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Authorize the script when prompted (access to this Sheet, plus "connect to
//    an external service" for the Discord webhook).
// 7. Copy the deployment URL and set it as PLAYTEST_SIGNUP_ENDPOINT in
//    src/scripts/holdstrong.ts.
//
// Re-deploy (Deploy > Manage deployments > edit > new version) whenever you
// change this script — editing the code alone doesn't update the live URL.
// Editing an existing deployment keeps its URL, so holdstrong.ts stays as is.

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const SHARED_TOKEN = 'zBqiE4MIi6OwJW3HU0MsiBaIZ5pxxbl7BrOtoAedRx590YLGeU064d5ZjyyKIJhK';

// Google Sheets (and Excel/LibreOffice on CSV export) interpret a cell value
// starting with =, +, -, @, or a tab/CR as a formula. An email that starts
// with one of those characters would otherwise still pass EMAIL_RE and get
// executed as a formula by whoever later opens the sheet. Prefixing it with
// an apostrophe forces the cell to be read as plain text.
function sanitizeForSheet(value) {
	return /^[=+\-@\t\r]/.test(value) ? "'" + value : value;
}

function doPost(e) {
	const params = e.parameter || {};

	if (params.token !== SHARED_TOKEN) {
		return ContentService.createTextOutput('unauthorized');
	}

	const email = (params.email || '').trim();

	if (!EMAIL_RE.test(email)) {
		return ContentService.createTextOutput('invalid email');
	}

	const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
	const lastRow = sheet.getLastRow();
	// Column B holds emails (see the sheet header set up in step 1 above).
	const existingEmails =
		lastRow > 1
			? sheet
					.getRange(2, 2, lastRow - 1, 1)
					.getValues()
					.flat()
					.map((value) => String(value).toLowerCase())
			: [];

	if (!existingEmails.includes(email.toLowerCase())) {
		sheet.appendRow([new Date(), sanitizeForSheet(email)]);
		// Rows minus the header row = signups including this one.
		notifyDiscord(lastRow);
	}

	return ContentService.createTextOutput('ok');
}

// Posts "new signup #n" to the Discord webhook. Deliberately without the email
// address: the channel is not the place for personal data, the Sheet is.
//
// Never throws. The row is already stored at this point, and a Discord outage
// must not turn a successful signup into an error for the visitor.
function notifyDiscord(signupCount) {
	const webhookUrl = PropertiesService.getScriptProperties().getProperty('DISCORD_WEBHOOK_URL');
	if (!webhookUrl) return;

	const payload = {
		username: 'NordWind Website',
		// Never ping anyone, whatever ends up in the message.
		allowed_mentions: { parse: [] },
		embeds: [
			{
				title: 'Neue Playtest-Anmeldung',
				description: 'HoldStrong · Anmeldung #' + signupCount,
				url: 'https://nordwind.games/holdstrong/',
				color: 0x4f8fba,
				timestamp: new Date().toISOString(),
			},
		],
	};

	try {
		const response = UrlFetchApp.fetch(webhookUrl, {
			method: 'post',
			contentType: 'application/json',
			payload: JSON.stringify(payload),
			muteHttpExceptions: true,
		});
		const status = response.getResponseCode();
		if (status >= 300) {
			console.error('Discord webhook answered ' + status + ': ' + response.getContentText());
		}
	} catch (err) {
		console.error('Discord webhook unreachable', err);
	}
}

// Run from the Apps Script editor to check the webhook without a real signup.
// Also triggers the authorization prompt for external requests.
function testDiscordNotification() {
	notifyDiscord(0);
}

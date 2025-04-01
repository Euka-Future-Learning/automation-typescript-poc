import { google } from 'googleapis';
import readline from 'readline';

const oauth2Client = new google.auth.OAuth2(
    'http://408493456531-kn2drcgcigss3slr69a1hs7i486ii96c.apps.googleusercontent.com/',
    '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',
    'http://localhost:3000/oauth2callback' // Redirect URL
);

// Generate auth URL
const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
});

console.log('Authorize this app by visiting:', authUrl);

// Setup to read authorization code
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter the code from the redirect URL: ', async (code) => {
    rl.close();

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token); // Only on first run

    // Use tokens in your Gmail API calls
    oauth2Client.setCredentials(tokens);
});
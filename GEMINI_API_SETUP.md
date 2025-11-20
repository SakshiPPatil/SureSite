# Gemini API Key Setup Guide

## Overview
To use the Gemini AI features in SureSite, you need to obtain a Gemini API key from Google AI Studio.

## Steps to Obtain a Gemini API Key

1. **Visit Google AI Studio**
   - Go to [Google AI Studio](https://aistudio.google.com/)

2. **Sign In**
   - Sign in with your Google account

3. **Navigate to API Keys**
   - Click on "Get API key" in a new project or select an existing project
   - Or go to the "API keys" section in the sidebar

4. **Create an API Key**
   - Click on "Create API key"
   - Copy the generated API key

5. **Configure Your Application**
   - Add the API key to your `.env` file:
     ```
     NEXT_PUBLIC_GEMINI_API_KEY=your_actual_gemini_api_key_here
     ```

## Using the Gemini API Key

Once you've configured your API key:

1. Restart your application
2. The Gemini features will be automatically enabled
3. If you encounter any issues, check the browser console for error messages

## Troubleshooting

If you're having trouble with the Gemini API:

1. **Check API Key Validity**
   - Ensure your API key is correct and hasn't expired
   - Verify that you've copied the entire key without extra spaces

2. **Verify API Access**
   - Make sure your Google account has access to the Gemini API
   - Check if there are any restrictions on your API key

3. **Rate Limits**
   - Be aware of usage limits for the Gemini API
   - If you exceed limits, you may need to wait or upgrade your quota

## Security Best Practices

1. **Protect Your API Key**
   - Never commit API keys to version control
   - Use environment variables to store API keys
   - Rotate API keys periodically

2. **Restrict API Key Usage**
   - Set up application restrictions for your API keys
   - Use API key quotas to prevent unexpected usage

## Alternative: Running Without Gemini

If you prefer not to use Gemini or don't have an API key:

1. Remove or leave blank the `NEXT_PUBLIC_GEMINI_API_KEY` environment variable
2. The application will automatically fall back to using the backend AI services
3. All core features will continue to work normally
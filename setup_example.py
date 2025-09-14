#!/usr/bin/env python3
"""
Example usage script for AI Image Analyzer
Demonstrates how to configure and use the application with a real Gemini API key
"""

import os
import sys

def setup_example():
    """Show example setup steps"""
    print("🚀 AI Image Analyzer - Example Setup")
    print("=" * 50)
    print()
    
    print("1. 📋 Copy the environment template:")
    print("   cp .env.example .env")
    print()
    
    print("2. 🔑 Get your Gemini API key:")
    print("   - Visit: https://makersuite.google.com/app/apikey")
    print("   - Sign in with your Google account")
    print("   - Create a new API key")
    print("   - Copy the key")
    print()
    
    print("3. ⚙️ Configure your environment:")
    print("   Edit .env file and replace 'your_gemini_api_key_here' with your actual API key:")
    print("   GEMINI_API_KEY=your_actual_api_key_here")
    print()
    
    print("4. 🎯 Start the application:")
    print("   python app.py")
    print()
    
    print("5. 🌐 Open in browser:")
    print("   http://localhost:5000")
    print()
    
    print("📝 Example analysis types you'll get:")
    print("   ✅ General description of the image")
    print("   ✅ Objects and elements identification")
    print("   ✅ Dominant colors analysis")
    print("   ✅ Composition and layout analysis")
    print("   ✅ Context and scenario detection")
    print("   ✅ Emotions and atmosphere")
    print("   ✅ Technical aspects (lighting, quality)")
    print("   ✅ Story interpretation")
    print()
    
    print("🛡️ Security features:")
    print("   ✅ File type validation")
    print("   ✅ File size limits (16MB max)")
    print("   ✅ Secure filename handling")
    print("   ✅ Automatic cleanup of uploaded files")
    print()

def check_current_setup():
    """Check the current setup status"""
    print("🔍 Current Setup Status:")
    print("-" * 30)
    
    # Check if .env exists
    if os.path.exists('.env'):
        print("✅ .env file exists")
        
        # Check if API key is configured
        try:
            from dotenv import load_dotenv
            load_dotenv()
            api_key = os.getenv('GEMINI_API_KEY')
            if api_key and api_key != 'your_gemini_api_key_here':
                print("✅ Gemini API key is configured")
                print(f"   Key starts with: {api_key[:10]}...")
            else:
                print("⚠️ Gemini API key needs to be configured in .env")
        except Exception as e:
            print(f"❌ Error checking API key: {e}")
    else:
        print("⚠️ .env file not found (copy from .env.example)")
    
    # Check if dependencies are installed
    try:
        import flask
        import google.generativeai
        import PIL
        print("✅ All dependencies are installed")
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
    
    print()

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "check":
        check_current_setup()
    else:
        setup_example()
        print()
        check_current_setup()
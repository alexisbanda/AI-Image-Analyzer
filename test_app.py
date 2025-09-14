#!/usr/bin/env python3
"""
Simple test script for AI Image Analyzer
Tests the basic functionality without requiring API keys
"""

import requests
import io
from PIL import Image
import base64
import time
import subprocess
import sys
import os

def create_test_image():
    """Create a simple test image for testing"""
    # Create a simple 100x100 red square image
    img = Image.new('RGB', (100, 100), color='red')
    img_buffer = io.BytesIO()
    img.save(img_buffer, format='PNG')
    img_buffer.seek(0)
    return img_buffer

def test_health_endpoint():
    """Test the health endpoint"""
    try:
        response = requests.get('http://localhost:5000/health', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print("✅ Health endpoint working:")
            print(f"   Status: {data['status']}")
            print(f"   Gemini configured: {data['gemini_configured']}")
            return True
        else:
            print(f"❌ Health endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health endpoint error: {e}")
        return False

def test_main_page():
    """Test that the main page loads"""
    try:
        response = requests.get('http://localhost:5000/', timeout=5)
        if response.status_code == 200 and 'AI Image Analyzer' in response.text:
            print("✅ Main page loads correctly")
            return True
        else:
            print(f"❌ Main page failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Main page error: {e}")
        return False

def test_upload_endpoint():
    """Test the upload endpoint with a simple image"""
    try:
        # Create test image
        test_img = create_test_image()
        
        # Prepare the file for upload
        files = {'file': ('test.png', test_img, 'image/png')}
        
        response = requests.post('http://localhost:5000/upload', files=files, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'success' in data and 'image_data' in data and 'analysis' in data:
                print("✅ Upload endpoint working:")
                print(f"   Success: {data['success']}")
                print(f"   Has image data: {'image_data' in data}")
                print(f"   Analysis length: {len(data['analysis'])} chars")
                return True
            else:
                print(f"❌ Upload response missing expected fields: {data}")
                return False
        else:
            data = response.json() if response.headers.get('content-type') == 'application/json' else response.text
            print(f"❌ Upload failed with status {response.status_code}: {data}")
            return False
    except Exception as e:
        print(f"❌ Upload endpoint error: {e}")
        return False

def run_tests():
    """Run all tests"""
    print("🧪 Testing AI Image Analyzer Application")
    print("=" * 50)
    
    # Check if server is running
    print("Checking if Flask server is running...")
    
    tests = [
        ("Health Endpoint", test_health_endpoint),
        ("Main Page", test_main_page),
        ("Upload Endpoint", test_upload_endpoint),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n🔍 Testing {test_name}...")
        if test_func():
            passed += 1
        time.sleep(1)  # Small delay between tests
    
    print(f"\n📊 Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! The application is working correctly.")
        return True
    else:
        print("⚠️ Some tests failed. Check the output above for details.")
        return False

if __name__ == "__main__":
    run_tests()
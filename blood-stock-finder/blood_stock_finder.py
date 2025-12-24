"""
Blood Stock Finder - Fetches nearby blood bank stock from eRaktKosh API
API: https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt
"""

import requests
import json
from tabulate import tabulate

# Blood Group Code Mapping
BLOOD_GROUP_CODES = {
    'A+': 11,
    'A-': 12,
    'B+': 13,
    'B-': 14,
    'O+': 15,
    'O-': 16,
    'AB+': 17,
    'AB-': 18
}

# Headers to mimic browser request
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.eraktkosh.in/',
    'Origin': 'https://www.eraktkosh.in'
}

def get_blood_group_code(blood_group: str) -> int:
    """Convert blood group string to API code."""
    bg = blood_group.upper().strip()
    if bg not in BLOOD_GROUP_CODES:
        raise ValueError(f"Invalid blood group: {blood_group}. Valid options: {', '.join(BLOOD_GROUP_CODES.keys())}")
    return BLOOD_GROUP_CODES[bg]

def fetch_nearby_blood_stock(latitude: float, longitude: float, blood_group: str) -> dict:
    """
    Fetch nearby blood bank stock from eRaktKosh API.
    
    Args:
        latitude: User's latitude
        longitude: User's longitude
        blood_group: Blood group string (e.g., 'A+', 'O-')
    
    Returns:
        dict: API response data
    """
    blood_code = get_blood_group_code(blood_group)
    
    url = f"https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt"
    params = {
        'hmode': 'GETNEARBYSTOCK',
        'lat': latitude,
        'long': longitude,
        'bg': blood_code
    }
    
    try:
        response = requests.get(url, params=params, headers=HEADERS, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.Timeout:
        raise ConnectionError("Request timed out. Please try again.")
    except requests.exceptions.RequestException as e:
        raise ConnectionError(f"Failed to fetch data: {str(e)}")
    except json.JSONDecodeError:
        raise ValueError("Invalid response from API. Please try again later.")

def parse_and_display_results(data: dict, blood_group: str) -> list:
    """
    Parse API response and display results in a formatted table.
    
    Args:
        data: API response dictionary
        blood_group: Requested blood group
    
    Returns:
        list: Parsed blood bank data
    """
    # Check for various response formats
    blood_banks = []
    
    if isinstance(data, list):
        blood_banks = data
    elif isinstance(data, dict):
        # Try different possible keys
        for key in ['data', 'result', 'bloodBanks', 'records', 'nearbyBB']:
            if key in data and isinstance(data[key], list):
                blood_banks = data[key]
                break
        if not blood_banks and 'status' not in data:
            # Maybe the dict itself contains the data
            blood_banks = [data] if any(k in data for k in ['hospitalName', 'bbName', 'name']) else []
    
    if not blood_banks:
        print(f"\n{'='*60}")
        print(f"❌ No blood banks found with {blood_group} blood stock nearby.")
        print(f"{'='*60}")
        print("\nSuggestions:")
        print("  • Try expanding your search radius")
        print("  • Check for a different blood component")
        print("  • Contact local blood banks directly")
        return []
    
    # Parse and format the data
    parsed_data = []
    for idx, bb in enumerate(blood_banks, 1):
        # Handle different field naming conventions
        hospital_name = bb.get('hospitalName') or bb.get('bbName') or bb.get('name') or bb.get('bloodBankName', 'N/A')
        distance = bb.get('distance') or bb.get('dist') or bb.get('distanceKm', 'N/A')
        address = bb.get('address') or bb.get('addr') or bb.get('location', 'N/A')
        contact = bb.get('contactNo') or bb.get('contact') or bb.get('phone') or bb.get('mobile', 'N/A')
        component = bb.get('componentName') or bb.get('bloodComponent') or bb.get('component', 'Whole Blood')
        stock = bb.get('stock') or bb.get('quantity') or bb.get('units') or bb.get('availableUnits', 'Available')
        
        # Format distance
        if distance != 'N/A' and isinstance(distance, (int, float)):
            distance = f"{distance:.2f} km"
        
        parsed_data.append({
            'sno': idx,
            'hospital': hospital_name[:40] + '...' if len(str(hospital_name)) > 40 else hospital_name,
            'distance': distance,
            'address': address[:50] + '...' if len(str(address)) > 50 else address,
            'contact': contact,
            'component': component,
            'stock': stock
        })
    
    # Display results
    print(f"\n{'='*100}")
    print(f"🩸 BLOOD STOCK AVAILABILITY FOR {blood_group}")
    print(f"{'='*100}")
    print(f"Found {len(parsed_data)} blood bank(s) with available stock\n")
    
    # Create table
    table_data = [
        [
            d['sno'],
            d['hospital'],
            d['distance'],
            d['contact'],
            d['component'],
            d['stock']
        ]
        for d in parsed_data
    ]
    
    headers = ['#', 'Hospital/Blood Bank', 'Distance', 'Contact', 'Component', 'Stock']
    print(tabulate(table_data, headers=headers, tablefmt='grid'))
    
    # Print addresses separately for readability
    print(f"\n📍 ADDRESSES:")
    print("-" * 60)
    for d in parsed_data:
        print(f"  {d['sno']}. {d['address']}")
    
    return parsed_data

def get_user_input() -> tuple:
    """Get latitude, longitude, and blood group from user."""
    print("\n" + "="*60)
    print("🩸 BLOOD STOCK FINDER - eRaktKosh India")
    print("="*60)
    print("\nThis tool helps you find nearby blood banks with available stock.")
    print("\nValid Blood Groups: A+, A-, B+, B-, O+, O-, AB+, AB-")
    print("-"*60)
    
    # Get latitude
    while True:
        try:
            lat_input = input("\n📍 Enter Latitude (e.g., 19.0760 for Mumbai): ").strip()
            latitude = float(lat_input)
            if not -90 <= latitude <= 90:
                print("❌ Latitude must be between -90 and 90")
                continue
            break
        except ValueError:
            print("❌ Please enter a valid number for latitude")
    
    # Get longitude
    while True:
        try:
            long_input = input("📍 Enter Longitude (e.g., 72.8777 for Mumbai): ").strip()
            longitude = float(long_input)
            if not -180 <= longitude <= 180:
                print("❌ Longitude must be between -180 and 180")
                continue
            break
        except ValueError:
            print("❌ Please enter a valid number for longitude")
    
    # Get blood group
    while True:
        blood_group = input("🩸 Enter Blood Group (A+, A-, B+, B-, O+, O-, AB+, AB-): ").strip().upper()
        if blood_group in BLOOD_GROUP_CODES:
            break
        print(f"❌ Invalid blood group. Please enter one of: {', '.join(BLOOD_GROUP_CODES.keys())}")
    
    return latitude, longitude, blood_group

def search_blood_stock(latitude: float, longitude: float, blood_group: str) -> list:
    """
    Main function to search for blood stock.
    Can be called programmatically or from CLI.
    
    Args:
        latitude: User's latitude
        longitude: User's longitude
        blood_group: Blood group string
    
    Returns:
        list: Parsed blood bank data
    """
    print(f"\n🔍 Searching for {blood_group} blood near ({latitude}, {longitude})...")
    
    try:
        data = fetch_nearby_blood_stock(latitude, longitude, blood_group)
        
        # Debug: Print raw response structure
        print(f"\n📡 API Response received. Processing...")
        
        # If the response has a status field, check it
        if isinstance(data, dict):
            status = data.get('status') or data.get('Status')
            message = data.get('message') or data.get('Message') or data.get('msg')
            
            if status and str(status).lower() in ['error', 'failed', 'failure', '0']:
                print(f"\n❌ API Error: {message or 'Unknown error'}")
                return []
        
        return parse_and_display_results(data, blood_group)
        
    except ValueError as e:
        print(f"\n❌ Error: {str(e)}")
        return []
    except ConnectionError as e:
        print(f"\n❌ Connection Error: {str(e)}")
        return []
    except Exception as e:
        print(f"\n❌ Unexpected Error: {str(e)}")
        return []

def main():
    """Main entry point for CLI usage."""
    try:
        latitude, longitude, blood_group = get_user_input()
        results = search_blood_stock(latitude, longitude, blood_group)
        
        if results:
            print(f"\n✅ Search completed successfully!")
            print(f"💡 Tip: Contact the blood bank before visiting to confirm availability.")
        
        print("\n" + "="*60)
        input("Press Enter to exit...")
        
    except KeyboardInterrupt:
        print("\n\n👋 Search cancelled by user.")

if __name__ == "__main__":
    main()

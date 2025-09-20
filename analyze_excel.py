
#!/usr/bin/env python3
import pandas as pd
import json
import sys

def analyze_excel_file(file_path):
    try:
        # Read all sheets from Excel file
        excel_file = pd.ExcelFile(file_path)
        print(f"Sheets found: {excel_file.sheet_names}")
        
        analysis_result = {
            "sheets": excel_file.sheet_names,
            "data": {}
        }
        
        # Analyze each sheet
        for sheet_name in excel_file.sheet_names:
            df = pd.read_excel(file_path, sheet_name=sheet_name)
            print(f"\n--- Sheet: {sheet_name} ---")
            print(f"Shape: {df.shape}")
            print(f"Columns: {list(df.columns)}")
            print(f"Sample data:")
            print(df.head())
            
            analysis_result["data"][sheet_name] = {
                "shape": df.shape,
                "columns": list(df.columns),
                "sample_data": df.head(10).to_dict('records') if not df.empty else []
            }
        
        # Save analysis to JSON (converting NaN to null)
        def clean_data(obj):
            if isinstance(obj, dict):
                return {k: clean_data(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [clean_data(item) for item in obj]
            elif pd.isna(obj):
                return None
            elif str(obj) == 'nan':
                return None
            else:
                return obj
        
        clean_analysis = clean_data(analysis_result)
        
        with open('/home/ubuntu/smartschedule/app/data/excel_analysis.json', 'w', encoding='utf-8') as f:
            json.dump(clean_analysis, f, ensure_ascii=False, indent=2, default=str)
        
        print("\nAnalysis saved to excel_analysis.json")
        
    except Exception as e:
        print(f"Error analyzing Excel file: {e}")
        return False
    
    return True

if __name__ == "__main__":
    file_path = "/home/ubuntu/smartschedule/app/data/schedule.xlsx"
    analyze_excel_file(file_path)

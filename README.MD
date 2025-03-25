# Pinpo Lead Management Integration

## 📋 Project Description

This project enables automated lead integration with the Pinpo platform, featuring dynamic sales representative assignment and lead data management.

## 🚀 Key Features

- Automatic lead submission to Pinpo API
- Dynamic sales representative allocation by region
- Data validation and verification
- Secure environment variable management

## 🔧 Prerequisites

- Node.js (version 16+ recommended)
- Pinpo Account
- Pinpo API Key

## 📦 Installation

1. Clone the repository
```bash
git clone <your-repository>
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the project root with:
```
PINPO_API_KEY=your_api_key
PINPO_SCENARIO_ID=your_scenario_id
PINPO_API_URL=https://api.pinpo.com/endpoint
```

## 🔐 Configuration

### Required Variables
- `PINPO_API_KEY`: API authentication key
- `PINPO_SCENARIO_ID`: Pinpo scenario identifier
- `PINPO_API_URL`: API endpoint URL

## 🏃 Usage

### Running the Script
```bash
npm start
```

### Usage Example
The script includes a default lead example for integration testing.

## 🌍 Region Management

The script supports two lead categories:
- `métropole`: Sales representatives for metropolitan France
- `outre-mer`: Sales representatives for overseas territories

## 🔍 Detailed Workflow

1. API Key validation
2. Dynamic sales representative selection
3. Lead payload construction
4. Submission to Pinpo API
5. Result logging

## 🛡️ Error Handling

- Environment variable validation
- API key format verification
- Detailed error logging

## 🔬 Data Types

### Lead Interface
- Personal information
- Product details
- Sales information
- Script and statistical data

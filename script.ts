import * as dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const PINPO_API_KEY = process.env.PINPO_API_KEY || '';
const PINPO_SCENARIO_ID = process.env.PINPO_SCENARIO_ID || '';
const PINPO_API_URL = process.env.PINPO_API_URL || '';

if (!PINPO_API_KEY || !PINPO_API_URL || !PINPO_SCENARIO_ID  ) {
  throw new Error("❌ ERROR: Environment variables not defined");
}

/**
 * Lead Model
 */
interface Lead {
  firstName: string;
  lastName: string;
  phone: string;
  mail: string;
  externalId: string;
  providerName: string;
  scenarioSelection?: string;
  product: {
    name: string;
    category: string;
    externalId: string;
  };
  salesPerson: {
    firstName: string;
    lastName: string;
    phone: string;
    mail: string;
    externalId: string;
    iCalUrl: string;
  };
  company: {
    name: string;
    externalId: string;
  };
  scriptData: { name: string; value: string }[];
  statsData: { name: string; value: string }[];
  outputData: { name: string; value: string }[];
}

/**
 * Assign Sales Person
 * @param category
 */
function assignSalesPerson(category: string) {
  const salesPeople: Record<string, { firstName: string; lastName: string; phone: string; mail: string; externalId: string; iCalUrl: string }> = {
    'outre-mer': {
      firstName: 'François',
      lastName: 'Dupont',
      phone: '3371234567',
      mail: 'francois.dupont@company.fr',
      externalId: 'sales-francois',
      iCalUrl: 'https://calendar.company.fr/francois'
    },
    'métropole': {
      firstName: 'Jean-Charles',
      lastName: 'Martin',
      phone: '33698765432',
      mail: 'jean-charles.martin@company.fr',
      externalId: 'sales-jean-charles',
      iCalUrl: 'https://calendar.company.fr/jean-charles'
    }
  };

  const key = category.toLowerCase();
  if (key in salesPeople) {
    console.log(`✅ Assigned salesman: ${salesPeople[key].firstName} ${salesPeople[key].lastName}`);
    return salesPeople[key];
  } else {
    console.error(`❌ ERROR: Invalid category lead: ${category}`);
    throw new Error('❌ ERROR: Invalid category lead');
  }
}

/**
 * Check if Api Key is valid
 */
async function checkApiKey() {
  if (PINPO_API_KEY.length >= 32) {
    console.log("✅ API Key format is valid");
    return true;
  }
  console.error("❌ Invalid API Key format");
  return false;
}

/**
 * Send Lead to Pinpo in format JSON
 */
async function sendLeadToPinpo(lead: Lead) {
  try {
    const headers = {
      'Accept': '*/*',
      'api-key': PINPO_API_KEY,
      'Content-Type': 'application/json'
    };

    const payload = {
      contact: {
        firstName: lead.firstName,
        lastName: lead.lastName,
        phone: lead.phone,
        mail: lead.mail,
        externalId: lead.externalId
      },
      externalId: lead.externalId,
      providerName: lead.providerName,
      scenarioSelection: PINPO_SCENARIO_ID,
      product: lead.product,
      salesPerson: lead.salesPerson,
      company: lead.company,
      scriptData: lead.scriptData,
      statsData: lead.statsData,
      outputData: lead.outputData
    };

    console.log("📤 Sending data to Pinpo:", JSON.stringify(payload, null, 2));

    const response = await fetch(PINPO_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    const responseBody = await response.json();
    console.log("✅ Server Response:", responseBody);

    return response;
  } catch (error: any) {
    console.error('Error sending leads:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    }
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting Pinpo integration...');

  if (!(await checkApiKey())) {
    console.error('❌ API Key is invalid. Aborting process.');
    return;
  }

  const sampleLead: Lead = {
    firstName: 'John',
    lastName: 'Doe',
    phone: '33606060606',
    mail: 'john.doe@email.fr',
    externalId: 'abcd1234',
    providerName: 'Facebook leads',
    scenarioSelection: PINPO_SCENARIO_ID,
    product: {
      name: 'Ream of Paper',
      category: 'new',
      externalId: '120paperream'
    },
    salesPerson: assignSalesPerson('outre-mer'),
    company: {
      name: 'Dunder Mifflin Paper Company Inc',
      externalId: 'huih89hhgh'
    },
    scriptData: [
      { name: 'location', value: 'Scranton' },
      { name: 'postalCode', value: '18501' }
    ],
    statsData: [
      { name: 'day', value: 'Monday' }
    ],
    outputData: [
      { name: 'civility', value: 'Mr' }
    ]
  };

  try {
    await sendLeadToPinpo(sampleLead);
    console.log('✅ Integration completed successfully!');
  } catch (error) {
    console.error('❌ Integration failed:', error);
  }
}

main().catch(console.error);

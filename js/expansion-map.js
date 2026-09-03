/**
 * SOURCEHUB.IN - PAN-INDIA & KARNATAKA EXPANSION FOOTPRINT MAP
 */

const HUB_DATA = {
  bengaluru: {
    name: 'Bengaluru Central Mega Hub',
    state: 'Karnataka (HQ)',
    status: 'Operational • 24/7 Active',
    warehouses: '3 Mega Warehouses + 18 Micro Stores',
    warehouseSqFt: '250,000+ sq.ft.',
    evFleet: '140+ EV Scooters & Vans',
    avgDeliveryTime: '2.2 Hours',
    coverage: '100% Greater Bengaluru & Outer Tech Corridors'
  },
  mysuru: {
    name: 'Mysuru Regional Distribution Hub',
    state: 'South Karnataka',
    status: 'Operational • Live',
    warehouses: '1 Regional Warehouse + 6 Micro Stores',
    warehouseSqFt: '65,000 sq.ft.',
    evFleet: '42 EV Scooters',
    avgDeliveryTime: '2.4 Hours',
    coverage: 'Mysuru Urban, Nanjangud, Mandya, Srirangapatna'
  },
  mangaluru: {
    name: 'Mangaluru Coastal Supply Hub',
    state: 'Coastal Karnataka',
    status: 'Operational • Live',
    warehouses: '1 Coastal Warehouse + 4 Express Points',
    warehouseSqFt: '48,000 sq.ft.',
    evFleet: '35 EV Cargo Units',
    avgDeliveryTime: '2.6 Hours',
    coverage: 'Mangaluru City, Udupi, Surathkal, Bantwal'
  },
  hubballi: {
    name: 'Hubballi-Dharwad North Hub',
    state: 'North Karnataka',
    status: 'Operational • Live',
    warehouses: '1 North Gateway Warehouse + 5 Stores',
    warehouseSqFt: '75,000 sq.ft.',
    evFleet: '50 EV Scooters',
    avgDeliveryTime: '2.3 Hours',
    coverage: 'Hubballi, Dharwad, Gadag, Haveri'
  },
  shivamogga: {
    name: 'Shivamogga Malnad Depot',
    state: 'Central Karnataka',
    status: 'Operational • Live',
    warehouses: '1 Malnad Depot + 3 Micro Hubs',
    warehouseSqFt: '38,000 sq.ft.',
    evFleet: '24 EV Cargo Units',
    avgDeliveryTime: '2.8 Hours',
    coverage: 'Shivamogga, Bhadravati, Sagar'
  },
  belagavi: {
    name: 'Belagavi Industrial Corridor Hub',
    state: 'North Karnataka',
    status: 'Operational • Live',
    warehouses: '1 Regional Depot + 4 Stores',
    warehouseSqFt: '52,000 sq.ft.',
    evFleet: '38 EV Cargo Units',
    avgDeliveryTime: '2.5 Hours',
    coverage: 'Belagavi, Gokak, Chikodi, Khanapur'
  },
  tumakuru: {
    name: 'Tumakuru Smart Industrial Node',
    state: 'Central Karnataka',
    status: 'Operational • Live',
    warehouses: '1 Express Fulfillment Center',
    warehouseSqFt: '40,000 sq.ft.',
    evFleet: '30 EV Cargo Units',
    avgDeliveryTime: '2.1 Hours',
    coverage: 'Tumakuru Smart City, Vasanthanarasapura, Sira'
  }
};

function initExpansionMap() {
  const pins = document.querySelectorAll('.city-hub-pin');
  const hubCityName = document.getElementById('hub-city-title');
  const hubStatusBadge = document.getElementById('hub-status-badge');
  const hubWarehouses = document.getElementById('hub-warehouse-count');
  const hubArea = document.getElementById('hub-area-size');
  const hubFleet = document.getElementById('hub-fleet-size');
  const hubDeliveryTime = document.getElementById('hub-delivery-time');
  const hubCoverageText = document.getElementById('hub-coverage-text');

  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const cityKey = pin.dataset.city;
      const data = HUB_DATA[cityKey];
      if (!data) return;

      pins.forEach(p => p.classList.remove('active'));
      pin.classList.add('active');

      if (hubCityName) hubCityName.textContent = data.name;
      if (hubStatusBadge) hubStatusBadge.textContent = data.status;
      if (hubWarehouses) hubWarehouses.textContent = data.warehouses;
      if (hubArea) hubArea.textContent = data.warehouseSqFt;
      if (hubFleet) hubFleet.textContent = data.evFleet;
      if (hubDeliveryTime) hubDeliveryTime.textContent = data.avgDeliveryTime;
      if (hubCoverageText) hubCoverageText.textContent = data.coverage;
    });
  });
}

document.addEventListener('DOMContentLoaded', initExpansionMap);

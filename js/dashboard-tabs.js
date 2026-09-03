/**
 * SOURCEHUB.IN - ROLE-BASED DASHBOARD INTERACTIVE PREVIEW & SIMULATOR
 */

function initDashboardTabs() {
  const roleButtons = document.querySelectorAll('.role-tab-btn');
  const tabContents = document.querySelectorAll('.dashboard-tab-content');
  const urlDisplay = document.getElementById('dashboard-url-display');

  const roleUrls = {
    retailer: 'https://app.sourcehub.in/retailer/inventory-orders',
    warehouse: 'https://wms.sourcehub.in/dispatch-control/blr-hub-01',
    admin: 'https://fleet.sourcehub.in/ev-telemetry/live-routes'
  };

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;

      roleButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(`tab-${role}`);
      if (targetContent) targetContent.classList.add('active');

      if (urlDisplay && roleUrls[role]) {
        urlDisplay.textContent = roleUrls[role];
      }
    });
  });

  // Simulated Barcode Scanner in Warehouse tab
  const scanBtn = document.getElementById('btn-simulate-scan');
  const scanResult = document.getElementById('scan-log-output');
  if (scanBtn && scanResult) {
    scanBtn.addEventListener('click', () => {
      const mockSKUs = [
        'SKU-FMCG-890123: Aashirvaad Atta 10kg [Batch #BLR-402] -> Zone A Verified',
        'SKU-BEV-992144: Red Bull 250ml Case [Batch #BLR-118] -> Dispatch Dock 03',
        'SKU-OIL-334102: Fortune Sunflower Oil 1L [Batch #BLR-890] -> EV Cargo Unit #07 Loaded',
        'SKU-SNK-771209: Lay’s Party Pack 48-Carton -> Scanned & Dispatched'
      ];
      const randomSKU = mockSKUs[Math.floor(Math.random() * mockSKUs.length)];
      const logEntry = document.createElement('div');
      logEntry.style.color = '#00DFB6';
      logEntry.style.fontSize = '0.82rem';
      logEntry.style.fontWeight = '600';
      logEntry.style.padding = '4px 0';
      logEntry.style.fontFamily = 'monospace';
      logEntry.innerHTML = `✓ [${new Date().toLocaleTimeString()}] ${randomSKU}`;
      
      scanResult.prepend(logEntry);
      if (scanResult.children.length > 5) {
        scanResult.removeChild(scanResult.lastChild);
      }
    });
  }

  // Quick Re-order simulation for Retailer tab
  const reorderBtns = document.querySelectorAll('.btn-reorder-action');
  reorderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const originalText = btn.textContent;
      btn.textContent = '✓ Reordered!';
      btn.style.background = '#00DFB6';
      btn.style.color = '#0A131F';
      btn.style.borderColor = '#00DFB6';
      btn.style.fontWeight = '700';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
        btn.style.fontWeight = '';
      }, 2000);
    });
  });
}

document.addEventListener('DOMContentLoaded', initDashboardTabs);

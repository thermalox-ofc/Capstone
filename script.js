const STORAGE_KEY = "pitstop-cloud-state";
const AUTH_KEY = "pitstop-cloud-auth";
const BAYS = ["Bay 1", "Bay 2", "Bay 3", "Bay 4"];
const SLOT_HOURS = [9, 10, 11, 12, 13, 14, 15, 16];
const DAILY_MILES_ESTIMATE = 33;
const CALENDAR_DAY_COUNT = 14;

const SERVICE_CATALOG = [
  {
    id: "coolant-flush",
    name: "Coolant Flush",
    intervalLabel: "Up to 100,000 miles",
    intervalMiles: 100000,
    price: "$373-$400",
    description: "Coolant condition changes over time and can damage head gaskets and related components."
  },
  {
    id: "oil-change",
    name: "Oil Change",
    intervalLabel: "5,000 miles estimate",
    intervalMiles: 5000,
    price: "$75-$145",
    description: "Fresh engine oil protects internal parts and clears normal debris buildup."
  },
  {
    id: "tire-rotation",
    name: "Tire Rotation",
    intervalLabel: "Inspect every 7,500 miles",
    intervalMiles: 7500,
    price: "$35-$45",
    description: "Rotating tires helps even tread wear and extends tire life."
  },
  {
    id: "tire-balancing",
    name: "Tire Balancing",
    intervalLabel: "As needed when vibration appears",
    intervalMiles: null,
    price: "$27-$34 per tire",
    description: "Balance only when vibration or uneven wear suggests a problem."
  },
  {
    id: "wipers",
    name: "Wipers",
    intervalLabel: "Inspect yearly",
    intervalMiles: null,
    price: "$68-$86",
    description: "Heat, salt, and debris wear blade rubber and reduce visibility."
  },
  {
    id: "rear-differential",
    name: "Rear Differential Fluid Change",
    intervalLabel: "30,000-60,000 miles",
    intervalMiles: 45000,
    price: "$84-$99",
    description: "All-wheel-drive and rear differential fluid should be changed on schedule."
  },
  {
    id: "brakes",
    name: "Brake Pads and Rotors",
    intervalLabel: "Inspect every 25,000 miles",
    intervalMiles: 25000,
    price: "$259-$300",
    description: "Pads and rotors should be inspected regularly and usually replaced together."
  },
  {
    id: "spark-plugs",
    name: "Spark Plugs",
    intervalLabel: "Around 100,000 miles",
    intervalMiles: 100000,
    price: "$212-$276",
    description: "Spark plugs wear over time even when they last for many miles."
  },
  {
    id: "timing-belt",
    name: "Timing Belt",
    intervalLabel: "60,000-120,000 miles",
    intervalMiles: 90000,
    price: "$603-$785",
    description: "Vehicles with timing belts need scheduled replacement before failure."
  },
  {
    id: "lightbulbs",
    name: "Lightbulbs",
    intervalLabel: "As needed",
    intervalMiles: null,
    price: "Varies",
    description: "Replace burned-out bulbs with the factory recommended model."
  },
  {
    id: "general-repair",
    name: "General Repair",
    intervalLabel: "As needed",
    intervalMiles: null,
    price: "Varies by repair",
    description: "General repair appointments cover unexpected issues, noises, leaks, and drivability concerns."
  },
  {
    id: "engine-diagnostic-repair",
    name: "Engine Diagnostic and Repair",
    intervalLabel: "As needed",
    intervalMiles: null,
    price: "Varies by diagnosis",
    description: "Use this for check engine lights, rough running, stalling, or engine performance repairs."
  },
  {
    id: "electrical-repair",
    name: "Electrical Repair",
    intervalLabel: "As needed",
    intervalMiles: null,
    price: "Varies by repair",
    description: "Electrical repair appointments cover battery drains, charging issues, wiring, and lighting faults."
  }
];

function createDemoState() {
  const customers = [
    {
      id: crypto.randomUUID(),
      name: "Jordan Carter",
      phone: "555-0101",
      email: "jordan@carterlogistics.com",
      loyaltyTier: "Fleet"
    },
    {
      id: crypto.randomUUID(),
      name: "Maya Thompson",
      phone: "555-0129",
      email: "maya.thompson@email.com",
      loyaltyTier: "Gold"
    },
    {
      id: crypto.randomUUID(),
      name: "Andre Lewis",
      phone: "555-0144",
      email: "andre.lewis@email.com",
      loyaltyTier: "None"
    }
  ];

  const vehicles = [
    {
      id: crypto.randomUUID(),
      customerId: customers[0].id,
      vin: "1FTFW1E55KFA12345",
      vehicleLabel: "2019 Ford F-150",
      mileage: 84210,
      warranty: "Extended warranty through Dec 2026",
      codes: "P0456"
    },
    {
      id: crypto.randomUUID(),
      customerId: customers[1].id,
      vin: "3CZRU5H53MM701245",
      vehicleLabel: "2021 Honda HR-V",
      mileage: 38140,
      warranty: "Powertrain through 60k miles",
      codes: "P0420, C0035"
    },
    {
      id: crypto.randomUUID(),
      customerId: customers[2].id,
      vin: "2T1BURHE7JC072114",
      vehicleLabel: "2018 Toyota Corolla",
      mileage: 92320,
      warranty: "Expired",
      codes: ""
    }
  ];

  const workOrders = [
    {
      id: crypto.randomUUID(),
      customerId: customers[1].id,
      vehicleId: vehicles[1].id,
      status: "In Progress",
      technician: "Alex Rivera",
      partsUsed: "Catalytic Converter, Sensor Harness",
      cost: 640,
      notes: "Confirmed emissions fault. Sensor readings improved after replacement."
    },
    {
      id: crypto.randomUUID(),
      customerId: customers[0].id,
      vehicleId: vehicles[0].id,
      status: "Waiting on Parts",
      technician: "Sam Lee",
      partsUsed: "Brake Pad Set",
      cost: 285,
      notes: "Rear brake pads below threshold. Waiting for restock before bay assignment."
    },
    {
      id: crypto.randomUUID(),
      customerId: customers[2].id,
      vehicleId: vehicles[2].id,
      status: "Ready for Pickup",
      technician: "Chris Hall",
      partsUsed: "Oil Filter, Synthetic Oil",
      cost: 89,
      notes: "Routine service completed. Customer notified by text."
    }
  ];

  const firstSlot = nextSlotDate(1, 9);
  const secondSlot = nextSlotDate(2, 11);
  const appointments = [
    {
      id: crypto.randomUUID(),
      customerId: customers[0].id,
      vehicleId: vehicles[0].id,
      bay: "Bay 2",
      technician: "Front Desk Queue",
      appointmentAt: firstSlot.toISOString(),
      reminderType: "Service Appointment",
      serviceType: "Oil Change",
      paymentMethod: "Debit/Credit",
      bookingNote: "Customer plans to wait in the lobby."
    },
    {
      id: crypto.randomUUID(),
      customerId: customers[2].id,
      vehicleId: vehicles[2].id,
      bay: "Bay 1",
      technician: "Front Desk Queue",
      appointmentAt: secondSlot.toISOString(),
      reminderType: "Service Appointment",
      serviceType: "Brake Pads and Rotors",
      paymentMethod: "Insurance",
      bookingNote: "Customer requested pickup text alert."
    }
  ];

  const inventory = [
    {
      id: crypto.randomUUID(),
      name: "Brake Pad Set",
      sku: "BPS-204",
      quantity: 5,
      reorderPoint: 6,
      price: 74.99
    },
    {
      id: crypto.randomUUID(),
      name: "Oil Filter",
      sku: "OIL-118",
      quantity: 22,
      reorderPoint: 10,
      price: 11.5
    },
    {
      id: crypto.randomUUID(),
      name: "Ignition Coil",
      sku: "IGN-441",
      quantity: 2,
      reorderPoint: 3,
      price: 96
    }
  ];

  return { customers, vehicles, workOrders, appointments, inventory };
}

let state = loadState();
let auth = loadAuth();

const demoUsers = [
  {
    id: "admin-user",
    role: "admin",
    email: "admin@pitstopcloud.com",
    password: "admin123",
    name: "Shop Admin"
  },
  {
    id: "operator-user",
    role: "operator",
    email: "operator@pitstopcloud.com",
    password: "operator123",
    name: "Service Operator"
  }
];

const elements = {
  loginForm: document.getElementById("loginForm"),
  loginMessage: document.getElementById("loginMessage"),
  logoutButton: document.getElementById("logoutButton"),
  sessionName: document.getElementById("sessionName"),
  sessionRole: document.getElementById("sessionRole"),
  heroEyebrow: document.getElementById("heroEyebrow"),
  heroTitle: document.getElementById("heroTitle"),
  heroCopy: document.getElementById("heroCopy"),
  metricCustomers: document.getElementById("metricCustomers"),
  metricVehicles: document.getElementById("metricVehicles"),
  metricOpenOrders: document.getElementById("metricOpenOrders"),
  metricLowStock: document.getElementById("metricLowStock"),
  utilizationRate: document.getElementById("utilizationRate"),
  loyaltyRate: document.getElementById("loyaltyRate"),
  partsDelayCount: document.getElementById("partsDelayCount"),
  remindersList: document.getElementById("remindersList"),
  customerList: document.getElementById("customerList"),
  vehicleList: document.getElementById("vehicleList"),
  workOrderList: document.getElementById("workOrderList"),
  scheduleList: document.getElementById("scheduleList"),
  inventoryList: document.getElementById("inventoryList"),
  customerSummary: document.getElementById("customerSummary"),
  customerVehicleList: document.getElementById("customerVehicleList"),
  customerAppointmentList: document.getElementById("customerAppointmentList"),
  customerWorkOrderList: document.getElementById("customerWorkOrderList"),
  customerNextSteps: document.getElementById("customerNextSteps"),
  customerMaintenanceList: document.getElementById("customerMaintenanceList"),
  customerVehicleCount: document.getElementById("customerVehicleCount"),
  customerOpenOrders: document.getElementById("customerOpenOrders"),
  customerUpcomingAppointments: document.getElementById("customerUpcomingAppointments"),
  portalTitle: document.getElementById("portalTitle"),
  customerForm: document.getElementById("customerForm"),
  vehicleForm: document.getElementById("vehicleForm"),
  workOrderForm: document.getElementById("workOrderForm"),
  scheduleForm: document.getElementById("scheduleForm"),
  customerBookingForm: document.getElementById("customerBookingForm"),
  inventoryForm: document.getElementById("inventoryForm"),
  vehicleCustomerSelect: document.getElementById("vehicleCustomerSelect"),
  workOrderCustomerSelect: document.getElementById("workOrderCustomerSelect"),
  workOrderVehicleSelect: document.getElementById("workOrderVehicleSelect"),
  scheduleCustomerSelect: document.getElementById("scheduleCustomerSelect"),
  scheduleVehicleSelect: document.getElementById("scheduleVehicleSelect"),
  scheduleServiceSelect: document.getElementById("scheduleServiceSelect"),
  schedulePaymentMethod: document.getElementById("schedulePaymentMethod"),
  customerAppointmentAt: document.getElementById("customerAppointmentAt"),
  customerVehicleSelect: document.getElementById("customerVehicleSelect"),
  customerServiceSelect: document.getElementById("customerServiceSelect"),
  customerPaymentMethod: document.getElementById("customerPaymentMethod")
};

const adminOnlyNodes = document.querySelectorAll("[data-admin-only]");
const customerOnlyNodes = document.querySelectorAll("[data-customer-only]");

document.querySelector('[data-action="seed"]').addEventListener("click", () => {
  state = createDemoState();
  persistState();
  render();
});

document.querySelector('[data-action="clear"]').addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  state = {
    customers: [],
    vehicles: [],
    workOrders: [],
    appointments: [],
    inventory: []
  };
  render();
});

elements.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const email = String(formData.get("email")).trim().toLowerCase();
  const password = String(formData.get("password"));
  const role = String(formData.get("role"));
  const matchedUser = findUserByCredentials(email, password, role);

  if (!matchedUser) {
    elements.loginMessage.textContent = "Login failed. Check the role, email, and password.";
    return;
  }

  auth = {
    role: matchedUser.role,
    email: matchedUser.email,
    name: matchedUser.name,
    customerId: matchedUser.customerId || null
  };
  persistAuth();
  elements.loginMessage.textContent = "";
  event.currentTarget.reset();
  render();
});

elements.logoutButton.addEventListener("click", () => {
  auth = null;
  localStorage.removeItem(AUTH_KEY);
  render();
});

elements.workOrderCustomerSelect.addEventListener("change", () => {
  syncVehicleSelect(elements.workOrderCustomerSelect, elements.workOrderVehicleSelect);
});

elements.scheduleCustomerSelect.addEventListener("change", () => {
  syncVehicleSelect(elements.scheduleCustomerSelect, elements.scheduleVehicleSelect);
});

elements.scheduleVehicleSelect.addEventListener("change", () => {
  syncPaymentOptions(elements.scheduleServiceSelect, elements.schedulePaymentMethod);
});
elements.scheduleServiceSelect.addEventListener("change", () => {
  syncPaymentOptions(elements.scheduleServiceSelect, elements.schedulePaymentMethod);
});
elements.customerVehicleSelect?.addEventListener("change", () => {
  syncPaymentOptions(elements.customerServiceSelect, elements.customerPaymentMethod);
});
elements.customerServiceSelect?.addEventListener("change", () => {
  syncPaymentOptions(elements.customerServiceSelect, elements.customerPaymentMethod);
});

if (elements.customerAppointmentAt) {
  elements.customerAppointmentAt.min = getMinDatetimeLocal();
}

elements.customerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  state.customers.unshift({
    id: crypto.randomUUID(),
    name: String(formData.get("name")).trim(),
    phone: String(formData.get("phone")).trim(),
    email: String(formData.get("email")).trim(),
    loyaltyTier: String(formData.get("loyaltyTier"))
  });
  event.currentTarget.reset();
  persistState();
  render();
});

elements.vehicleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  state.vehicles.unshift({
    id: crypto.randomUUID(),
    customerId: String(formData.get("customerId")),
    vin: String(formData.get("vin")).trim().toUpperCase(),
    vehicleLabel: String(formData.get("vehicleLabel")).trim(),
    mileage: Number(formData.get("mileage")),
    warranty: String(formData.get("warranty")).trim(),
    codes: String(formData.get("codes")).trim()
  });
  event.currentTarget.reset();
  persistState();
  render();
});

elements.workOrderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  state.workOrders.unshift({
    id: crypto.randomUUID(),
    customerId: String(formData.get("customerId")),
    vehicleId: String(formData.get("vehicleId")),
    status: String(formData.get("status")),
    technician: String(formData.get("technician")).trim(),
    partsUsed: String(formData.get("partsUsed")).trim(),
    cost: Number(formData.get("cost")),
    notes: String(formData.get("notes")).trim()
  });
  event.currentTarget.reset();
  persistState();
  render();
});

elements.scheduleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const appointmentAt = new Date(String(formData.get("appointmentAt")));

  if (Number.isNaN(appointmentAt.getTime())) {
    return;
  }

  if (isDoubleBooked(appointmentAt.toISOString())) {
    window.alert("That appointment time is already booked. Please choose another time.");
    return;
  }

  state.appointments.unshift({
    id: crypto.randomUUID(),
    customerId: String(formData.get("customerId")),
    vehicleId: String(formData.get("vehicleId")),
    bay: "",
    technician: String(formData.get("technician")).trim(),
    appointmentAt: appointmentAt.toISOString(),
    reminderType: "Service Appointment",
    serviceType: String(formData.get("serviceType")),
    paymentMethod: String(formData.get("paymentMethod")),
    bookingNote: String(formData.get("bookingNote")).trim()
  });
  event.currentTarget.reset();
  persistState();
  render();
});

elements.customerBookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const customer = getCurrentCustomer();
  const formData = new FormData(event.currentTarget);
  const appointmentAt = new Date(String(formData.get("appointmentAt")));

  if (!customer || Number.isNaN(appointmentAt.getTime())) {
    return;
  }

  if (appointmentAt < new Date()) {
    window.alert("Customers cannot book past appointment times.");
    return;
  }

  if (isDoubleBooked(appointmentAt.toISOString())) {
    window.alert("That appointment time is already booked. Please choose another time.");
    return;
  }

  state.appointments.unshift({
    id: crypto.randomUUID(),
    customerId: customer.id,
    vehicleId: String(formData.get("vehicleId")),
    bay: "",
    technician: "Front Desk Queue",
    appointmentAt: appointmentAt.toISOString(),
    reminderType: "Service Appointment",
    serviceType: String(formData.get("serviceType")),
    paymentMethod: String(formData.get("paymentMethod")),
    bookingNote: "Booked by customer portal."
  });
  event.currentTarget.reset();
  persistState();
  render();
});

elements.inventoryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  state.inventory.unshift({
    id: crypto.randomUUID(),
    name: String(formData.get("name")).trim(),
    sku: String(formData.get("sku")).trim().toUpperCase(),
    quantity: Number(formData.get("quantity")),
    reorderPoint: Number(formData.get("reorderPoint")),
    price: Number(formData.get("price"))
  });
  event.currentTarget.reset();
  persistState();
  render();
});

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return createDemoState();
  }

  try {
    return normalizeState(JSON.parse(saved));
  } catch {
    return createDemoState();
  }
}

function loadAuth() {
  const saved = localStorage.getItem(AUTH_KEY);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

function normalizeState(rawState) {
  return {
    customers: rawState.customers || [],
    vehicles: rawState.vehicles || [],
    workOrders: rawState.workOrders || [],
    appointments: (rawState.appointments || []).map((appointment) => ({
      reminderType: "Service Appointment",
      serviceType: appointment.serviceType || appointment.reminderType || "General Inspection",
      paymentMethod: appointment.paymentMethod || "Debit/Credit",
      bookingNote: appointment.bookingNote || "",
      technician: appointment.technician || "Front Desk Queue",
      ...appointment
    })),
    inventory: rawState.inventory || []
  };
}

function isDoubleBooked(appointmentIsoString) {
  return state.appointments.some((appointment) => appointment.appointmentAt === appointmentIsoString);
}

function getMinDatetimeLocal() {
  const now = new Date();
  now.setMinutes(Math.ceil(now.getMinutes() / 5) * 5, 0, 0);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function persistAuth() {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

function render() {
  applyAuthView();
  if (!auth) {
    return;
  }

  populateSelects();
  renderMetrics();
  renderReminders();
  renderCustomers();
  renderVehicles();
  renderWorkOrders();
  renderSchedule();
  renderInventory();
  renderCustomerPortal();
}

function populateSelects() {
  populateServiceOptions(elements.scheduleServiceSelect);
  populateServiceOptions(elements.customerServiceSelect);

  const customerOptions = state.customers
    .map((customer) => `<option value="${customer.id}">${customer.name}</option>`)
    .join("");

  [
    elements.vehicleCustomerSelect,
    elements.workOrderCustomerSelect,
    elements.scheduleCustomerSelect
  ].forEach((select) => {
    select.innerHTML = customerOptions || '<option value="">Add a customer first</option>';
    select.disabled = state.customers.length === 0;
  });

  syncVehicleSelect(elements.workOrderCustomerSelect, elements.workOrderVehicleSelect);
  syncVehicleSelect(elements.scheduleCustomerSelect, elements.scheduleVehicleSelect);
  populateCustomerVehicleOptions();
  syncPaymentOptions(elements.scheduleServiceSelect, elements.schedulePaymentMethod);
  syncPaymentOptions(elements.customerServiceSelect, elements.customerPaymentMethod);
}

function populateServiceOptions(select) {
  if (!select) {
    return;
  }

  const currentValue = select.value;
  select.innerHTML = SERVICE_CATALOG
    .map((service) => `<option value="${service.name}">${service.name}</option>`)
    .join("");

  if (currentValue && SERVICE_CATALOG.some((service) => service.name === currentValue)) {
    select.value = currentValue;
  }
}

function syncVehicleSelect(customerSelect, vehicleSelect) {
  const selectedVehicle = vehicleSelect.value;
  const matchingVehicles = state.vehicles.filter((vehicle) => vehicle.customerId === customerSelect.value);
  vehicleSelect.innerHTML = matchingVehicles.length
    ? matchingVehicles.map((vehicle) => `<option value="${vehicle.id}">${vehicle.vehicleLabel}</option>`).join("")
    : '<option value="">Add a vehicle for this customer first</option>';
  vehicleSelect.disabled = matchingVehicles.length === 0;

  if (selectedVehicle && matchingVehicles.some((vehicle) => vehicle.id === selectedVehicle)) {
    vehicleSelect.value = selectedVehicle;
  }
}

function populateCustomerVehicleOptions() {
  if (!elements.customerVehicleSelect) {
    return;
  }

  const customer = getCurrentCustomer();
  const vehicles = state.vehicles.filter((vehicle) => vehicle.customerId === customer?.id);
  const currentValue = elements.customerVehicleSelect.value;
  elements.customerVehicleSelect.innerHTML = vehicles.length
    ? vehicles.map((vehicle) => `<option value="${vehicle.id}">${vehicle.vehicleLabel}</option>`).join("")
    : '<option value="">No vehicles linked yet</option>';
  elements.customerVehicleSelect.disabled = vehicles.length === 0;

  if (currentValue && vehicles.some((vehicle) => vehicle.id === currentValue)) {
    elements.customerVehicleSelect.value = currentValue;
  }
}


function syncPaymentOptions(serviceSelect, paymentSelect) {
  if (!serviceSelect || !paymentSelect) {
    return;
  }

  const isRepair = isRepairService(serviceSelect.value);
  const currentValue = paymentSelect.value;
  paymentSelect.innerHTML = isRepair
    ? `
      <option value="Insurance">Insurance</option>
      <option value="Debit/Credit">Debit/Credit</option>
      <option value="Cash">Cash</option>
    `
    : `
      <option value="Debit/Credit">Debit/Credit</option>
      <option value="Cash">Cash</option>
    `;

  if (isRepair && ["Insurance", "Debit/Credit", "Cash"].includes(currentValue)) {
    paymentSelect.value = currentValue;
  } else if (!isRepair && ["Debit/Credit", "Cash"].includes(currentValue)) {
    paymentSelect.value = currentValue;
  }
}

function isRepairService(serviceName) {
  return ["General Repair", "Engine Diagnostic and Repair", "Electrical Repair"].includes(serviceName);
}

function renderMetrics() {
  if (!isStaffUser()) {
    return;
  }

  const openStatuses = ["Scheduled", "In Progress", "Waiting on Parts", "Ready for Pickup"];
  const openOrders = state.workOrders.filter((order) => openStatuses.includes(order.status));
  const lowStock = state.inventory.filter((part) => part.quantity <= part.reorderPoint);
  const loyaltyCustomers = state.customers.filter((customer) => customer.loyaltyTier !== "None");
  const waitingOnParts = state.workOrders.filter((order) => order.status === "Waiting on Parts");
  const utilization = Math.min(100, Math.round((state.appointments.length / (BAYS.length * SLOT_HOURS.length)) * 100));
  const loyaltyRate = state.customers.length === 0 ? 0 : Math.round((loyaltyCustomers.length / state.customers.length) * 100);

  elements.metricCustomers.textContent = state.customers.length;
  elements.metricVehicles.textContent = state.vehicles.length;
  elements.metricOpenOrders.textContent = openOrders.length;
  elements.metricLowStock.textContent = lowStock.length;
  elements.utilizationRate.textContent = `${utilization}%`;
  elements.loyaltyRate.textContent = `${loyaltyRate}%`;
  elements.partsDelayCount.textContent = waitingOnParts.length;
}

function renderReminders() {
  const appointments = isStaffUser()
    ? state.appointments
    : state.appointments.filter((appointment) => appointment.customerId === auth?.customerId);

  elements.remindersList.innerHTML = renderList(
    [...appointments].sort((a, b) => new Date(a.appointmentAt) - new Date(b.appointmentAt)).slice(0, 4),
    (appointment) => {
      const customer = findCustomer(appointment.customerId);
      const vehicle = findVehicle(appointment.vehicleId);
      return `
        <article class="list-card">
          <h4>${appointment.serviceType || "Service Appointment"}</h4>
          <p>${customer?.name || "Unknown customer"} · ${vehicle?.vehicleLabel || "Unknown vehicle"}</p>
          <div class="stack-meta">
            <span class="pill">${formatDate(appointment.appointmentAt)}</span>
            <span class="pill">${appointment.paymentMethod || "Debit/Credit"}</span>
          </div>
        </article>
      `;
    },
    "No appointments scheduled yet."
  );
}

function renderCustomers() {
  if (!isStaffUser()) {
    return;
  }

  elements.customerList.innerHTML = renderList(
    state.customers,
    (customer) => {
      const vehiclesOwned = state.vehicles.filter((vehicle) => vehicle.customerId === customer.id).length;
      return `
        <article class="list-card">
          <h4>${customer.name}</h4>
          <p>${customer.email}</p>
          <div class="stack-meta">
            <span class="pill">${customer.phone}</span>
            <span class="pill">Tier: ${customer.loyaltyTier}</span>
            <span class="pill">${vehiclesOwned} vehicle(s)</span>
          </div>
        </article>
      `;
    },
    "No customers yet. Start by creating your first shop customer profile."
  );
}

function renderVehicles() {
  if (!isStaffUser()) {
    return;
  }

  elements.vehicleList.innerHTML = renderList(
    state.vehicles,
    (vehicle) => {
      const customer = findCustomer(vehicle.customerId);
      const nextService = getMaintenanceSuggestions(vehicle)[0];
      return `
        <article class="list-card">
          <h4>${vehicle.vehicleLabel}</h4>
          <p>${customer?.name || "Unknown customer"} · VIN ${vehicle.vin}</p>
          <div class="stack-meta">
            <span class="pill">${Number(vehicle.mileage).toLocaleString()} miles</span>
            <span class="pill">${vehicle.warranty || "No warranty notes"}</span>
            <span class="pill">${vehicle.codes || "No active codes"}</span>
          </div>
          <p>${nextService ? `Next suggested service: ${nextService.name} · ${nextService.daysLabel}` : "No mileage-based service suggestion yet."}</p>
        </article>
      `;
    },
    "No vehicles yet. Link a vehicle to a customer to build service history."
  );
}

function renderWorkOrders() {
  if (!isStaffUser()) {
    return;
  }

  elements.workOrderList.innerHTML = renderList(
    state.workOrders,
    (order) => {
      const customer = findCustomer(order.customerId);
      const vehicle = findVehicle(order.vehicleId);
      return `
        <article class="list-card">
          <h4>${order.status}</h4>
          <p>${customer?.name || "Unknown customer"} · ${vehicle?.vehicleLabel || "Unknown vehicle"}</p>
          <div class="stack-meta">
            <span class="pill">${order.technician}</span>
            <span class="pill">${formatCurrency(order.cost)}</span>
            <span class="pill">${order.partsUsed || "Labor only"}</span>
          </div>
          <p>${order.notes || "No service notes yet."}</p>
        </article>
      `;
    },
    "No work orders yet. Create one to begin tracking service activity."
  );
}

function renderSchedule() {
  if (!isStaffUser()) {
    return;
  }

  elements.scheduleList.innerHTML = renderList(
    [...state.appointments].sort((a, b) => new Date(a.appointmentAt) - new Date(b.appointmentAt)),
    (appointment) => {
      const customer = findCustomer(appointment.customerId);
      const vehicle = findVehicle(appointment.vehicleId);
      return `
        <article class="list-card">
          <h4>${appointment.serviceType || "General Inspection"}</h4>
          <p>${customer?.name || "Unknown customer"} · ${vehicle?.vehicleLabel || "Vehicle not found"}</p>
          <div class="stack-meta">
            <span class="pill">${formatDate(appointment.appointmentAt)}</span>
            <span class="pill">${appointment.paymentMethod || "Debit/Credit"}</span>
          </div>
          <p>${appointment.bookingNote || "No extra booking notes."}</p>
        </article>
      `;
    },
    "No appointments yet. Book the next opening from the available calendar."
  );
}

function renderInventory() {
  if (!isStaffUser()) {
    return;
  }

  elements.inventoryList.innerHTML = renderList(
    state.inventory,
    (part) => {
      const isLow = part.quantity <= part.reorderPoint;
      return `
        <article class="list-card">
          <h4>${part.name}</h4>
          <p>SKU ${part.sku}</p>
          <div class="stack-meta">
            <span class="pill">${part.quantity} in stock</span>
            <span class="pill">Reorder at ${part.reorderPoint}</span>
            <span class="pill">${formatCurrency(part.price)}</span>
            <span class="pill">${isLow ? "Needs reorder" : "Stock healthy"}</span>
          </div>
        </article>
      `;
    },
    "No parts added yet. Start your inventory list with common service items."
  );
}

function renderCustomerPortal() {
  if (!isCustomerUser()) {
    return;
  }

  const customer = getCurrentCustomer();
  const vehicles = state.vehicles.filter((vehicle) => vehicle.customerId === customer?.id);
  const vehicleIds = new Set(vehicles.map((vehicle) => vehicle.id));
  const workOrders = state.workOrders.filter((order) => order.customerId === customer?.id || vehicleIds.has(order.vehicleId));
  const appointments = state.appointments.filter((appointment) => appointment.customerId === customer?.id || vehicleIds.has(appointment.vehicleId));
  const openStatuses = ["Scheduled", "In Progress", "Waiting on Parts", "Ready for Pickup"];

  elements.portalTitle.textContent = customer ? `${customer.name}'s vehicles and service history` : "My vehicles and service history";
  elements.customerVehicleCount.textContent = vehicles.length;
  elements.customerOpenOrders.textContent = workOrders.filter((order) => openStatuses.includes(order.status)).length;
  elements.customerUpcomingAppointments.textContent = appointments.length;

  elements.customerSummary.innerHTML = customer
    ? `
      <article class="list-card">
        <h4>${customer.name}</h4>
        <p>${customer.email}</p>
        <div class="stack-meta">
          <span class="pill">${customer.phone}</span>
          <span class="pill">Tier: ${customer.loyaltyTier}</span>
        </div>
      </article>
    `
    : '<div class="empty-state">This customer account is not linked to a saved profile yet.</div>';

  elements.customerVehicleList.innerHTML = renderList(
    vehicles,
    (vehicle) => {
      const nextService = getMaintenanceSuggestions(vehicle)[0];
      return `
        <article class="list-card">
          <h4>${vehicle.vehicleLabel}</h4>
          <p>VIN ${vehicle.vin}</p>
          <div class="stack-meta">
            <span class="pill">${Number(vehicle.mileage).toLocaleString()} miles</span>
            <span class="pill">${vehicle.warranty || "No warranty notes"}</span>
            <span class="pill">${vehicle.codes || "No active codes"}</span>
          </div>
          <p>${nextService ? `${nextService.name} · ${nextService.daysLabel}` : "No mileage-based maintenance estimate available."}</p>
        </article>
      `;
    },
    "No vehicles are linked to this customer account yet."
  );

  elements.customerAppointmentList.innerHTML = renderList(
    [...appointments].sort((a, b) => new Date(a.appointmentAt) - new Date(b.appointmentAt)),
    (appointment) => {
      const vehicle = findVehicle(appointment.vehicleId);
      return `
        <article class="list-card">
          <h4>${appointment.serviceType || "Service Appointment"}</h4>
          <p>${vehicle?.vehicleLabel || "Vehicle not found"}</p>
          <div class="stack-meta">
            <span class="pill">${formatDate(appointment.appointmentAt)}</span>
            <span class="pill">${appointment.paymentMethod || "Debit/Credit"}</span>
          </div>
        </article>
      `;
    },
    "No upcoming appointments or reminders yet."
  );

  elements.customerWorkOrderList.innerHTML = renderList(
    workOrders,
    (order) => {
      const vehicle = findVehicle(order.vehicleId);
      return `
        <article class="list-card">
          <h4>${order.status}</h4>
          <p>${vehicle?.vehicleLabel || "Vehicle not found"}</p>
          <div class="stack-meta">
            <span class="pill">${order.technician}</span>
            <span class="pill">${formatCurrency(order.cost)}</span>
            <span class="pill">${order.partsUsed || "Labor only"}</span>
          </div>
          <p>${order.notes || "No service notes yet."}</p>
        </article>
      `;
    },
    "No service history yet for this account."
  );

  const maintenanceCards = vehicles.flatMap((vehicle) =>
    getMaintenanceSuggestions(vehicle).slice(0, 3).map((item) => `
      <article class="list-card">
        <h4>${vehicle.vehicleLabel} · ${item.name}</h4>
        <p>${item.description}</p>
        <div class="stack-meta">
          <span class="pill">${item.intervalLabel}</span>
          <span class="pill">${item.price}</span>
          <span class="pill">${item.daysLabel}</span>
        </div>
      </article>
    `)
  );
  elements.customerMaintenanceList.innerHTML = maintenanceCards.length
    ? maintenanceCards.join("")
    : '<div class="empty-state">Add a vehicle to see maintenance suggestions based on mileage.</div>';

  const nextSteps = [];
  const nextAppointment = [...appointments].sort((a, b) => new Date(a.appointmentAt) - new Date(b.appointmentAt))[0];
  const activeOrder = workOrders.find((order) => openStatuses.includes(order.status));
  const dueSoon = vehicles.flatMap((vehicle) => getMaintenanceSuggestions(vehicle)).find((item) => item.daysLeft !== null && item.daysLeft <= 30);

  if (nextAppointment) {
    nextSteps.push(`
      <article class="list-card">
        <h4>Next visit</h4>
        <p>Your next appointment is scheduled for ${formatDate(nextAppointment.appointmentAt)} for ${nextAppointment.serviceType || "service"}.</p>
      </article>
    `);
  }

  if (activeOrder) {
    nextSteps.push(`
      <article class="list-card">
        <h4>Current repair status</h4>
        <p>Your latest active work order is marked <strong>${activeOrder.status}</strong>.</p>
      </article>
    `);
  }

  if (dueSoon) {
    nextSteps.push(`
      <article class="list-card">
        <h4>Routine service due soon</h4>
        <p>${dueSoon.name} is approaching. Estimated time left: ${dueSoon.daysLabel.toLowerCase()}.</p>
      </article>
    `);
  }

  if (nextSteps.length === 0) {
    nextSteps.push('<div class="empty-state">No immediate updates right now. You can book your next service from the appointment panel.</div>');
  }

  elements.customerNextSteps.innerHTML = nextSteps.join("");
}

function getMaintenanceSuggestions(vehicle) {
  return SERVICE_CATALOG.map((service) => {
    if (!service.intervalMiles) {
      return {
        ...service,
        daysLeft: null,
        daysLabel: service.intervalLabel
      };
    }

    const milesLeft = milesUntilNextService(Number(vehicle.mileage || 0), service.intervalMiles);
    const daysLeft = milesLeft <= 0 ? 0 : Math.ceil(milesLeft / DAILY_MILES_ESTIMATE);
    return {
      ...service,
      milesLeft,
      daysLeft,
      daysLabel: daysLeft === 0 ? "Due now" : `${daysLeft} day(s) left`
    };
  }).sort((first, second) => {
    if (first.daysLeft === null && second.daysLeft === null) {
      return first.name.localeCompare(second.name);
    }
    if (first.daysLeft === null) {
      return 1;
    }
    if (second.daysLeft === null) {
      return -1;
    }
    return first.daysLeft - second.daysLeft;
  });
}

function milesUntilNextService(currentMileage, intervalMiles) {
  const remainder = currentMileage % intervalMiles;
  return remainder === 0 ? 0 : intervalMiles - remainder;
}

function renderList(items, renderItem, emptyMessage) {
  if (!items.length) {
    return `<div class="empty-state">${emptyMessage}</div>`;
  }
  return items.map(renderItem).join("");
}

function findCustomer(customerId) {
  return state.customers.find((customer) => customer.id === customerId);
}

function findVehicle(vehicleId) {
  return state.vehicles.find((vehicle) => vehicle.id === vehicleId);
}

function getCurrentCustomer() {
  if (!auth?.customerId) {
    return null;
  }
  return findCustomer(auth.customerId);
}

function isCustomerUser() {
  return auth?.role === "customer";
}

function isStaffUser() {
  return auth?.role === "admin" || auth?.role === "operator";
}

function getAllUsers() {
  const customerUsers = state.customers.map((customer) => ({
    id: `customer-${customer.id}`,
    role: "customer",
    email: customer.email.toLowerCase(),
    password: "customer123",
    name: customer.name,
    customerId: customer.id
  }));

  return [...demoUsers, ...customerUsers];
}

function findUserByCredentials(email, password, role) {
  return getAllUsers().find((user) => user.email === email && user.password === password && user.role === role);
}

function applyAuthView() {
  const loggedIn = Boolean(auth);
  document.body.classList.toggle("auth-ready", loggedIn);
  document.body.classList.toggle("auth-locked", !loggedIn);

  if (!loggedIn) {
    elements.sessionName.textContent = "Guest";
    elements.sessionRole.textContent = "Sign in to access the dashboard";
    return;
  }

  elements.sessionName.textContent = auth.name;
  elements.sessionRole.textContent = isCustomerUser() ? "Customer Portal" : auth.role === "admin" ? "Admin Dashboard" : "Operator Dashboard";

  adminOnlyNodes.forEach((node) => {
    node.hidden = !isStaffUser();
  });
  customerOnlyNodes.forEach((node) => {
    node.hidden = !isCustomerUser();
  });

  if (isCustomerUser()) {
    elements.heroEyebrow.textContent = "Customer Access";
    elements.heroTitle.textContent = "Book available appointments and track routine service timing.";
    elements.heroCopy.textContent = "The customer portal shows your vehicles, open appointments, and a maintenance checklist with estimated days left based on current mileage.";
  } else {
    elements.heroEyebrow.textContent = "Operations Dashboard";
    elements.heroTitle.textContent = "Book service from open calendar slots and guide customers to the next routine visit.";
    elements.heroCopy.textContent = "Operators can choose a customer, select a listed service, and book only from open calendar slots while reviewing suggested routine maintenance timing.";
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(Number(value || 0));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function nextSlotDate(dayOffset, hour) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + dayOffset);
  if (date.getDay() === 0) {
    date.setDate(date.getDate() + 1);
  }
  if (date.getDay() === 6) {
    date.setDate(date.getDate() + 2);
  }
  date.setHours(hour, 0, 0, 0);
  return date;
}

render();

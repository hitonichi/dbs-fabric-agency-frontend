export const ROUTES = {
  staff: {
    view: '/staffs',
    detail: '/staffs/:staffId',
  },
  customer: {
    view: '/customers',
    detail: '/customers/:customerId',
  },
  order: {
    view: '/orders',
    detail: 'orders/:orderId',
  },
  transaction: {
    view: '/transactions',
    detail: '/transactions/:transactionId',
  },
  fabric: {
    view: '/fabric',
    categoryDetail: '/fabric/:type',
  },
  supplier: {
    view: '/suppliers',
    detail: '/suppliers/:supplierId',
  },
};

export const USER_ACCESS_CONTROL = {
  manager: [ROUTES.staff.view, ROUTES.staff.detail],
  provider: [],
  partnerStaff: [ROUTES.supplier.view, ROUTES.supplier.detail],
  operationalStaff: [ROUTES.order.view, ROUTES.order.detail],
  officeStaff: [ROUTES.customer.view, ROUTES.customer.detail],
  customer: [ROUTES.order.view, ROUTES.order.detail],
};

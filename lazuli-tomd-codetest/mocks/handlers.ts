

import { http, HttpResponse } from "msw";

export type Table = {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
  description: string;
};

const tables: Table[] = [
  {
    id: '1',
    title: 'Customer Transaction Table',
    status: 'in_progress',
    created_at: '2025-03-20T10:00:00Z',
    description: 'PostgreSQL table containing customer transaction records. Includes foreign keys to customer_id and product_id. Needs indexing optimization for faster query performance.'
  },
  {
    id: '2',
    title: 'User Authentication Schema',
    status: 'completed',
    created_at: '2025-03-18T14:30:00Z',
    description: 'MongoDB collection for user authentication data. Contains hashed passwords, access tokens, and user roles. Requires regular maintenance to remove expired tokens.'
  },
  {
    id: '3',
    title: 'Product Inventory View',
    status: 'pending',
    created_at: '2025-03-22T09:15:00Z',
    description: 'SQL view that joins product table with inventory and supplier tables. Provides real-time inventory levels and reorder status. Performance optimization needed for large datasets.'
  },
  {
    id: '4',
    title: 'Analytics Data Warehouse',
    status: 'pending',
    created_at: '2025-03-23T16:45:00Z',
    description: 'Snowflake data warehouse for business analytics. Contains denormalized data from multiple sources with daily ETL updates. Currently experiencing slow query performance on large aggregations.'
  },
  {
    id: '5',
    title: 'API Request Logs',
    status: 'in_progress',
    created_at: '2025-03-21T11:20:00Z',
    description: 'Elasticsearch index storing API request logs with timestamp, endpoint, user_id, and response time. Used for monitoring system performance and detecting anomalies. Current retention policy: 30 days.'
  }
];

type CreateRequest = {
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  description: string;
};

type UpdateRequest = {
  title?: string;
  status?: 'pending' | 'in_progress' | 'completed';
  description?: string;
};

export const handlers = [
  http.get('http://example.com/api/tables', () => {
    return HttpResponse.json(tables);
  }),

  http.get('http://example.com/api/tables/:id', ({ params }) => {
    const { id } = params;
    const databaseObject = tables.find(obj => obj.id === id);
    
    if (!databaseObject) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json(databaseObject);
  }),

  http.post('http://example.com/api/tables', async ({ request }) => {
    const body = await request.json() as CreateRequest;
    
    const tableObj: Table = {
      id: String(tables.length + 1),
      title: body.title || 'Untitled Database Object',
      status: body.status || 'pending',
      created_at: new Date().toISOString(),
      description: body.description || ''
    };
    
    
    return HttpResponse.json(tableObj, { status: 201 });
  }),

  http.put('http://example.com/api/tables/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json() as UpdateRequest;
    
    const databaseObjectIndex = tables.findIndex(obj => obj.id === id);
    
    if (databaseObjectIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    
    
    const updatedDatabaseObject = {
      ...tables[databaseObjectIndex],
      ...body,
      id
    };
    
    return HttpResponse.json(updatedDatabaseObject);
  }),

  http.delete('http://example.com/api/tables/:id', ({ params }) => {
    const { id } = params;
    
    const databaseObjectIndex = tables.findIndex(obj => obj.id === id);
    
    if (databaseObjectIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json({ success: true });
  })
];
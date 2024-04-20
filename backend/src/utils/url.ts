export const backendurl =
  // process.env.NODE_ENV === 'production' ? 'https://api.example.com' : 'http://localhost:8080/api';
  process.env.BACKEND_URL || 'http://localhost:8080/api';

export const frontendUrl =
  // process.env.NODE_ENV === 'production' ? 'https://example.com' : 'http://localhost:3000';
  process.env.FRONTEND_URL || 'http://localhost:3000';

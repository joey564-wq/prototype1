const WebSocket = require('ws');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    realtime: {
      transport: WebSocket,
    },
  }
);

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
};

module.exports.getAll = async (event) => {
  const { data, error } = await supabase
    .from('listings')
    .select('*, users(*), categories(*)')
    .order('created_at', { ascending: false });

  if (error) return { statusCode: 500, headers, body: JSON.stringify({ error }) };
  return { statusCode: 200, headers, body: JSON.stringify(data) };
};

module.exports.getById = async (event) => {
  const { id } = event.pathParameters;
  const { data, error } = await supabase
    .from('listings')
    .select('*, users(*), categories(*)')
    .eq('id', id)
    .single();

  if (error) return { statusCode: 404, headers, body: JSON.stringify({ error }) };
  return { statusCode: 200, headers, body: JSON.stringify(data) };
};

module.exports.create = async (event) => {
  const body = JSON.parse(event.body);
  const { data, error } = await supabase
    .from('listings')
    .insert([body])
    .select();

  if (error) return { statusCode: 400, headers, body: JSON.stringify({ error }) };
  return { statusCode: 201, headers, body: JSON.stringify(data) };
};

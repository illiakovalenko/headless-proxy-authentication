import { rest } from 'msw';

import Home from './pages/Home.json';
import Styleguide from './pages/Styleguide.json';
import Login from './pages/Login.json';

const routes = {
  '/': Home,
  '/styleguide': Styleguide,
  '/login': Login,
} as Record<string, any>;

const cdp = (path: any) => {
  return new URL(path, 'http://my.sitecore.host').toString();
};

export const handlers = [
  rest.get(cdp('/sitecore/api/layout/render/default'), async (req, res, ctx) => {
    const item = req.url.searchParams.get('item') || '/';

    if (item === '/styleguide') {
      return res(ctx.status(401), ctx.json({ message: 'forbidden' }));
    }

    return res(ctx.json(routes[item]));
  }),
  rest.get(cdp('/sitecore/api/jss/dictionary/react-app/en'), (_req, res, ctx) => {
    return res(
      ctx.json({
        lang: 'en',
        phrases: {
          'styleguide-sample': 'This is a dictionary entry in English as a demonstration',
          Documentation: 'Documentation',
          Styleguide: 'Styleguide',
          GraphQL: 'GraphQL',
        },
      })
    );
  }),
];

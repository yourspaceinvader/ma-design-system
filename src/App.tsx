import { useState } from 'react';
import { Button } from './components/Button/Button';
import { Badge } from './components/Badge/Badge';
import { Input } from './components/Input/Input';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div data-theme={theme} style={{ minHeight: '100vh', background: 'var(--color-bg-surface)' }}>
      <div className="mx-auto max-w-xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-headline-md font-semibold text-text">M&amp;A Design System</h1>
          <Button size="sm" variant="outlined" onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
            {theme === 'light' ? 'Switch to dark' : 'Switch to light'}
          </Button>
        </div>

        <div className="mb-6 flex gap-2">
          <Badge status="diligence" />
          <Badge status="closed" />
          <Badge status="at-risk" />
        </div>

        <div className="mb-6">
          <Input label="Deal name" placeholder="Project Falcon" helperText="Internal codename, not shown to counterparty" />
        </div>

        <div className="flex gap-3">
          <Button variant="contained">Approve deal</Button>
          <Button variant="outlined">Request changes</Button>
          <Button variant="critical">Withdraw offer</Button>
        </div>
      </div>
    </div>
  );
}

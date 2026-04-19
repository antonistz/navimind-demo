import { useState, useEffect } from 'react';
import RouteMap from './RouteMap';
import KpiPanel from './KpiPanel';
import AiExplanationPanel from './AiExplanationPanel';
import VoyageInfoBar from './VoyageInfoBar';
import AiChatPanel from './AiChatPanel';
import { LoadingCard, LoadingPanel } from './LoadingPanel';
import { getVoyages, getVoyageOptimization } from '../api/mockClient';
import type { VoyageListItem, OptimizeResult } from '../types';
import './NavimindLayout.css';

type Status = 'loading' | 'success' | 'error';

function NavimindLayout() {
  const [voyageList, setVoyageList] = useState<VoyageListItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>('Athens-Heraklion');
  const [result, setResult] = useState<OptimizeResult | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    getVoyages().then(setVoyageList);
  }, []);

  useEffect(() => {
    setStatus('loading');
    setResult(null);
    getVoyageOptimization(selectedId)
      .then(r => { setResult(r); setStatus('success'); })
      .catch(() => setStatus('error'));
  }, [selectedId]);

  return (
    <div className="navimind-container">
      <header className="navimind-header">
        <div>
          <h1>NaviMind – Route Intelligence Demo</h1>
          <p className="subtitle">
            {status === 'loading' ? 'Optimizing route…' : 'AI-optimized routing · real UX flow · static data'}
          </p>
        </div>
        <div className="voyage-selector">
          <span className="label">Voyage:</span>
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            disabled={status === 'loading'}
          >
            {voyageList.length === 0
              ? <option value={selectedId}>Loading…</option>
              : voyageList.map(v => (
                  <option key={v.id} value={v.id}>{v.label}</option>
                ))
            }
          </select>
        </div>
      </header>

      <main className="navimind-main">
        <div className="navimind-left">
          <RouteMap
            baselineRoute={result?.baselineRoute ?? []}
            optimalRoute={result?.optimalRoute ?? []}
            dangerZones={result?.dangerZones ?? []}
            isLoading={status === 'loading'}
          />
        </div>

        <div className="navimind-right">
          {status === 'error' && (
            <div className="navimind-error">
              Failed to load voyage data.{' '}
              <button onClick={() => setSelectedId(selectedId)}>Retry</button>
            </div>
          )}

          {status === 'loading' || !result ? (
            <>
              <LoadingCard />
              <LoadingPanel rows={3} />
              <LoadingPanel rows={4} />
            </>
          ) : (
            <>
              <KpiPanel voyage={result.voyage} fuelHistory={result.fuelHistory} />
              <AiExplanationPanel voyage={result.voyage} />
              <AiChatPanel voyage={result.voyage} seedMessages={result.seedMessages} />
            </>
          )}
        </div>
      </main>

      <footer className="navimind-footer">
        <VoyageInfoBar voyage={result?.voyage ?? null} isLoading={status === 'loading'} />
      </footer>
    </div>
  );
}

export default NavimindLayout;

import { useId, useMemo, useState } from 'react';
import { ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react';
import { formatUsd } from '../../lib/format';
import { cx } from '../../lib/cx';

type PromoCode = 'none' | 'QAVERIFY' | 'FLEX90';

const presets = [
  { label: '$499.99', value: '499.99' },
  { label: '$500.00', value: '500.00' },
  { label: '$1,499.99', value: '1499.99' },
  { label: '$1,500.00', value: '1500.00' },
];

function parseCents(value: string): number {
  const parsed = Number.parseFloat(value.replace(/,/g, ''));
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.min(Math.round(parsed * 100), 100_000_00);
}

export function RuleProbe() {
  const [balance, setBalance] = useState('1500.00');
  const [opening, setOpening] = useState('500.00');
  const [deposit, setDeposit] = useState(false);
  const [promo, setPromo] = useState<PromoCode>('QAVERIFY');
  const [age, setAge] = useState(90);

  const id = useId();
  const balanceCents = parseCents(balance);
  const openingCents = parseCents(opening);

  const result = useMemo(() => {
    const feeWaived = balanceCents >= 150_000 || deposit;
    const promoActive = promo === 'QAVERIFY' && openingCents >= 50_000;
    const closureApplies = age <= 90 && openingCents >= 50_000 && promo !== 'FLEX90';
    const apy = promoActive ? 4.1 : 0.5;
    return {
      feeWaived,
      fee: feeWaived ? 0 : 500,
      promoActive,
      apy,
      closureApplies,
      closureFee: closureApplies ? 2500 : 0,
    };
  }, [balanceCents, openingCents, deposit, promo, age]);

  const summary = [
    result.feeWaived ? 'Monthly fee waived.' : 'Monthly fee charged at $5.00.',
    result.promoActive ? 'Promotional APY of 4.10 percent applies.' : 'Base APY of 0.50 percent applies.',
    result.closureApplies ? 'An early-closure fee of $25.00 would apply today.' : 'No early-closure fee would apply today.',
  ].join(' ');

  function reset() {
    setBalance('1500.00');
    setOpening('500.00');
    setDeposit(false);
    setPromo('QAVERIFY');
    setAge(90);
  }

  return (
    <div className="rule-probe">
      <div className="interactive-head">
        <div>
          <span className="mono-label">Interactive demonstration</span>
          <h3>Rule probe / statement eligibility</h3>
        </div>
        <button type="button" className="mini-button" onClick={reset}>
          <RotateCcw size={13} strokeWidth={1.6} aria-hidden="true" />
          Reset
        </button>
      </div>

      <p className="interactive-note">
        Adjust the sample inputs to explore the fictional Northstar rules. This is a local model, not a live banking
        product.
      </p>

      <div className="rule-probe__layout">
        <div className="rule-probe__controls">
          <div className="field">
            <label htmlFor={`${id}-balance`}>Average daily balance</label>
            <div className="field__input-wrap">
              <span aria-hidden="true">$</span>
              <input
                id={`${id}-balance`}
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={balance}
                onChange={(event) => setBalance(event.target.value)}
                aria-describedby={`${id}-balance-hint`}
              />
              <span className="field__suffix">USD</span>
            </div>
            <p id={`${id}-balance-hint`} className="field__hint">Fee waiver threshold is $1,500.00.</p>
            <div className="preset-row" aria-label="Balance presets">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setBalance(preset.value)}
                  aria-pressed={balance === preset.value}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rule-probe__boundary" aria-hidden="true">
            <div className="rule-probe__boundary-labels">
              <span>$0</span>
              <span>$1,500</span>
              <span>$2,000+</span>
            </div>
            <div className="rule-probe__boundary-track">
              <span
                className="rule-probe__boundary-marker"
                style={{ left: `${Math.min((balanceCents / 200_000) * 100, 100)}%` }}
              />
              <span className="rule-probe__threshold" style={{ left: '75%' }} />
            </div>
            <div className="rule-probe__boundary-caption">
              {result.feeWaived ? 'Waiver condition satisfied' : '$0.01 or more below the balance threshold'}
            </div>
          </div>

          <div className="field">
            <label htmlFor={`${id}-opening`}>Opening deposit</label>
            <div className="field__input-wrap">
              <span aria-hidden="true">$</span>
              <input
                id={`${id}-opening`}
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={opening}
                onChange={(event) => setOpening(event.target.value)}
              />
              <span className="field__suffix">USD</span>
            </div>
            <p className="field__hint">Promo eligibility threshold is $500.00.</p>
          </div>

          <div className="rule-probe__switches">
            <button
              type="button"
              className={cx('switch-row', deposit && 'is-on')}
              role="switch"
              aria-checked={deposit}
              onClick={() => setDeposit((value) => !value)}
            >
              <span>
                <strong>Direct deposit active</strong>
                <small>Full statement cycle</small>
              </span>
              <span className="switch-row__track" aria-hidden="true"><i /></span>
            </button>

            <div className="select-field">
              <label htmlFor={`${id}-promo`}>Promo code</label>
              <select id={`${id}-promo`} value={promo} onChange={(event) => setPromo(event.target.value as PromoCode)}>
                <option value="none">No code</option>
                <option value="QAVERIFY">QAVERIFY / APY promo</option>
                <option value="FLEX90">FLEX90 / closure waiver</option>
              </select>
            </div>

            <div className="slider-field">
              <label htmlFor={`${id}-age`}>Closure day</label>
              <div className="slider-field__value">Day {age}</div>
              <input
                id={`${id}-age`}
                type="range"
                min="0"
                max="120"
                step="1"
                value={age}
                onChange={(event) => setAge(Number(event.target.value))}
                aria-valuetext={`Day ${age}`}
              />
              <div className="slider-field__labels"><span>Day 0</span><span>Day 90</span><span>Day 120</span></div>
            </div>
          </div>
        </div>

        <div className="rule-probe__output" aria-describedby={`${id}-summary`}>
          <div className="rule-probe__output-head">
            <ShieldCheck size={18} strokeWidth={1.4} aria-hidden="true" />
            <span>Calculated outputs</span>
            <span className="rule-probe__mode">SAMPLE MODEL</span>
          </div>

          <div className="rule-output">
            <div className="rule-output__primary">
              <span className="mono-label">Monthly maintenance fee</span>
              <strong>{result.feeWaived ? 'WAIVED' : formatUsd(result.fee)}</strong>
              <small>{result.feeWaived ? (balanceCents >= 150_000 ? 'Qualified by balance' : 'Qualified by direct deposit') : 'Below threshold and no full-cycle deposit'}</small>
            </div>
            <div className="rule-output__pair">
              <div>
                <span className="mono-label">Promotional APY</span>
                <strong>{result.apy.toFixed(2)}%</strong>
                <small>{result.promoActive ? 'Promo active' : 'Base rate'}</small>
              </div>
              <div>
                <span className="mono-label">Closure fee / today</span>
                <strong>{result.closureFee ? formatUsd(result.closureFee) : '$0.00'}</strong>
                <small>{result.closureApplies ? 'Within 90 days' : 'No closure fee'}</small>
              </div>
            </div>
          </div>

          <div className="rule-trace">
            <div className="rule-trace__head">
              <span className="mono-label">Rule trace</span>
              <span className="mono-label">Observed</span>
            </div>
            <ul>
              <li>
                <span>ADB <code>{formatUsd(balanceCents)}</code> ≥ <code>$1,500.00</code></span>
                <span className={result.feeWaived ? 'is-pass' : 'is-fail'}>{balanceCents >= 150_000 ? 'TRUE' : 'FALSE'}</span>
              </li>
              <li>
                <span>Direct deposit / full cycle</span>
                <span className={deposit ? 'is-pass' : 'is-fail'}>{deposit ? 'TRUE' : 'FALSE'}</span>
              </li>
              <li>
                <span>Promo <code>QAVERIFY</code> + opening ≥ <code>$500.00</code></span>
                <span className={result.promoActive ? 'is-pass' : 'is-fail'}>{result.promoActive ? 'TRUE' : 'FALSE'}</span>
              </li>
              <li>
                <span>Age <code>{age}</code> ≤ <code>90</code> + opening ≥ <code>$500.00</code> + no <code>FLEX90</code></span>
                <span className={result.closureApplies ? 'is-warn' : 'is-pass'}>{result.closureApplies ? 'FEE' : 'CLEAR'}</span>
              </li>
            </ul>
          </div>

          <div className="rule-probe__verdict">
            <span className="rule-probe__verdict-icon" aria-hidden="true"><ArrowRight size={15} strokeWidth={1.6} /></span>
            <p>
              {result.feeWaived && result.promoActive
                ? 'Both independent benefits resolve as expected. Reconcile the amount against the statement and ledger.'
                : result.feeWaived
                  ? 'The fee is waived, but the promo is not eligible under the selected opening deposit or code.'
                  : 'A $5.00 fee is expected in this scenario. Check exactly the same value in every presentation layer.'}
            </p>
          </div>
        </div>
      </div>

      <p id={`${id}-summary`} className="sr-only" aria-live="polite">{summary}</p>
    </div>
  );
}

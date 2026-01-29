interface SummaryCardProps {
  label: string
  value: string
  helper?: string
}

export const SummaryCard = ({ label, value, helper }: SummaryCardProps) => (
  <div className="summary-card">
    <p className="summary-label">{label}</p>
    <h3>{value}</h3>
    {helper && <span className="summary-helper">{helper}</span>}
  </div>
)

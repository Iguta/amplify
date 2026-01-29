import { PageHeader } from '../components/PageHeader'
import { ProgressCard } from '../components/ProgressCard'
import { SummaryCard } from '../components/SummaryCard'
import { useTasks } from '../hooks/useTasks'
import { useGoals } from '../hooks/useGoals'
import { buildProgressSnapshots } from '../utils/progress'

export const DashboardPage = () => {
  const { tasks } = useTasks()
  const { goals } = useGoals()

  const completedTasks = tasks.filter((task) => task.completed).length
  const openTasks = tasks.length - completedTasks
  const averageGoalProgress =
    goals.length === 0
      ? 0
      : Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)

  const snapshots = buildProgressSnapshots(tasks)

  return (
    <div className="page">
      <PageHeader
        title="Dashboard"
        subtitle="Track progress across daily and long-term rhythms."
      />
      <section className="summary-grid">
        <SummaryCard label="Open tasks" value={`${openTasks}`} helper="Tasks still in motion" />
        <SummaryCard label="Completed tasks" value={`${completedTasks}`} helper="Great momentum" />
        <SummaryCard label="Average goal progress" value={`${averageGoalProgress}%`} helper="Across all goals" />
      </section>
      <section className="progress-grid">
        {snapshots.map((snapshot) => (
          <ProgressCard key={snapshot.label} snapshot={snapshot} />
        ))}
      </section>
      <section className="insight-panel">
        <div>
          <p className="section-label">Progress Report</p>
          <h2>Simple, clear momentum checks</h2>
        </div>
        <p>
          Amplify keeps your focus aligned by highlighting the most important rhythms — today, this week, this month, and this year.
          Use these insights to celebrate wins and adjust priorities with calm confidence.
        </p>
      </section>
    </div>
  )
}

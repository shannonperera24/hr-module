import axios from 'axios'
import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Home = () => {
  const [totalPersonnel, setTotalPersonnel] = useState(null);
  const [expiringClearances, setExpiringClearances] = useState(null);
  const [fitnessData, setFitnessData] = useState(null);
  const [rankData, setRankData] = useState(null);
  const [loadingTotal, setLoadingTotal] = useState(true);
  const [loadingClearances, setLoadingClearances] = useState(true);
  const [loadingFitness, setLoadingFitness] = useState(true);
  const [loadingRank, setLoadingRank] = useState(true);

  useEffect(() => {
    const loadTotalPersonnel = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/employee/stats/total-personnel"
        );
        setTotalPersonnel(res.data.total);
      } catch (error) {
        console.error("Error fetching total personnel:", error);
      } finally {
        setLoadingTotal(false);
      }
    };

    const loadExpiringClearances = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/employee_clearance/stats/expiring"
        );
        setExpiringClearances(res.data.expiringSoon);
      } catch (error) {
        console.error("Error fetching expiring clearances:", error);
      } finally {
        setLoadingClearances(false);
      }
    };

    const loadFitnessStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/medical_and_health_record/stats/fitness-pie"
        );
        const labels = res.data.map(item => item.fitness_category_name);
        const counts = res.data.map(item => item.count);
        setFitnessData({
          labels,
          datasets: [
            {
              data: counts,
              backgroundColor: [
                "#4CAF50", // A
                "#2196F3", // B
                "#FFC107", // C
                "#FF5722", // Additional categories if any
              ],
              borderWidth: 1
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching fitness stats:", error);
      } finally {
        setLoadingFitness(false);
      }
    };

    const loadRankStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/posting/stats/current-by-rank"
        );
        const labels = res.data.map(item => item.rank_name);
        const counts = res.data.map(item => item.count);
        setRankData({
          labels,
          datasets: [
            {
              label: "Personnel Count",
              data: counts,
              borderWidth: 1
            }
          ]
        });
      } catch (err) {
        console.error("Error loading rank stats:", err);
      } finally {
        setLoadingRank(false);
      }
    };

    loadTotalPersonnel();
    loadExpiringClearances();
    loadFitnessStats();
    loadRankStats();
  }, []);

  return (
    <div className="home-page px-5 mt-4">
      <div className="dashboard-grid">
        
          <div className="dashboard-card small-card">
            <h4 className="card-title">Total Personnel</h4>
            <p className="card-value">
              {loadingTotal ? "Loading..." : totalPersonnel}
            </p>
          </div>

          <div className="dashboard-card small-card">
            <h4 className="card-title">Clearances Expiring Soon</h4>
            <p className="card-value">
              {loadingClearances ? "Loading..." : expiringClearances}
            </p>
          </div>

        <div className='chart-flex-row'>
          <div className="dashboard-card pie-card" style={{ minHeight: "350px" }}>
            <h4 className="card-title">Fitness Category Distribution</h4>
            <div className='chart-wrapper pie-wrapper'>
              {loadingFitness ? (
                <p>Loading...</p>
              ) : (
                <Pie data={fitnessData} 
                  options={{
                    plugins: {
                      legend: {
                        position: "right",
                        fullSize: false,  
                        labels: {
                          padding: 20,   
                          font: { size: 14, weight: "bold"},
                          color: "#ffffff" 
                        }
                      }
                    }
                  }}
                />
              )}
            </div>  
          </div>

          <div className="dashboard-card bar-card" style={{ minHeight: "350px" }}>
            <h4 className="card-title">Current Personnel by Rank</h4>
            <div className="chart-wrapper bar-wrapper">
              {loadingRank ? (
                <p>Loading...</p>
              ) : (
                <Bar 
                  data={{
                    labels: rankData.labels,
                    datasets: [
                      {
                        label: "Personnel Count",
                        data: rankData.datasets[0].data,
                        backgroundColor: "#2196F3",    
                        borderColor: "#1565C0",
                        borderWidth: 1,
                        barThickness: 30,            
                        maxBarThickness: 40
                      }
                    ]
                  }}
                  options={{
                    responsive: true, 
                    maintainAspectRatio: false, 
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: { 
                      x: { ticks: { font: { size: 12 }, color: "#fff", maxRotation: 45, minRotation: 45 },
                        grid: { color: "rgba(255,255,255,0.2)" } },
                      y: { ticks: { font: { size: 12 }, color: "#fff" },  
                        grid: { color: "rgba(255,255,255,0.2)" }, beginAtZero: true }
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home
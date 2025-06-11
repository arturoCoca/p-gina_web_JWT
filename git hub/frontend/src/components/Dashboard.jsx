import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const BASE_URL = "https://token-auth-project.onrender.com"; // ✅ URL del backend en Render

const Dashboard = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
    fetchDashboardStats();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${BASE_URL}/api/auth/profile/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${BASE_URL}/api/sales/dashboard/stats/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };





  const renderDashboardContent = () => {
    if (loading) {
      return <div className="loading">Cargando estadísticas...</div>;
    }

    return (
      <div className="dashboard-content">
        <h2>Panel de Control</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{stats?.total_clientes || 0}</h3>
              <p>Clientes</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>{stats?.total_productos || 0}</h3>
              <p>Productos</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-info">
              <h3>{stats?.total_proveedores || 0}</h3>
              <p>Proveedores</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>${stats?.ventas_mes?.total || 0}</h3>
              <p>Ventas del Mes</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🛒</div>
            <div className="stat-info">
              <h3>${stats?.compras_mes?.total || 0}</h3>
              <p>Compras del Mes</p>
            </div>
          </div>
          
          <div className="stat-card warning">
            <div className="stat-icon">⚠️</div>
            <div className="stat-info">
              <h3>{stats?.productos_stock_bajo || 0}</h3>
              <p>Stock Bajo</p>
            </div>
          </div>
        </div>
        
        <div className="recent-activity">
          <h3>Actividad Reciente</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">📊</span>
              <span>Sistema de ventas inicializado</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">👤</span>
              <span>Usuario {user?.username} conectado</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboardContent();
      case 'ventas':
        return (
          <div className="section-content">
            <h2>Gestión de Ventas</h2>
            <p>Aquí podrás gestionar todas las ventas del sistema.</p>
            <div className="feature-placeholder">
              <span className="placeholder-icon">💰</span>
              <p>Funcionalidad de ventas en desarrollo</p>
            </div>
          </div>
        );
      case 'compras':
        return (
          <div className="section-content">
            <h2>Gestión de Compras</h2>
            <p>Aquí podrás gestionar todas las compras del sistema.</p>
            <div className="feature-placeholder">
              <span className="placeholder-icon">🛒</span>
              <p>Funcionalidad de compras en desarrollo</p>
            </div>
          </div>
        );
      case 'productos':
        return (
          <div className="section-content">
            <h2>Gestión de Productos</h2>
            <p>Aquí podrás gestionar el inventario de productos.</p>
            <div className="feature-placeholder">
              <span className="placeholder-icon">📦</span>
              <p>Funcionalidad de productos en desarrollo</p>
            </div>
          </div>
        );
      case 'proveedores':
        return (
          <div className="section-content">
            <h2>Gestión de Proveedores</h2>
            <p>Aquí podrás gestionar la información de proveedores.</p>
            <div className="feature-placeholder">
              <span className="placeholder-icon">🏢</span>
              <p>Funcionalidad de proveedores en desarrollo</p>
            </div>
          </div>
        );
      case 'clientes':
        return (
          <div className="section-content">
            <h2>Gestión de Clientes</h2>
            <p>Aquí podrás gestionar la información de clientes.</p>
            <div className="feature-placeholder">
              <span className="placeholder-icon">👥</span>
              <p>Funcionalidad de clientes en desarrollo</p>
            </div>
          </div>
        );
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>Sistema de Ventas</h2>
        </div>
        
        <ul className="sidebar-menu">
          <li className={activeSection === 'dashboard' ? 'active' : ''}>
            <button onClick={() => setActiveSection('dashboard')}>
              <span className="menu-icon">📊</span>
              Dashboard
            </button>
          </li>
          <li className={activeSection === 'ventas' ? 'active' : ''}>
            <button onClick={() => setActiveSection('ventas')}>
              <span className="menu-icon">💰</span>
              Ventas
            </button>
          </li>
          <li className={activeSection === 'compras' ? 'active' : ''}>
            <button onClick={() => setActiveSection('compras')}>
              <span className="menu-icon">🛒</span>
              Compras
            </button>
          </li>
          <li className={activeSection === 'productos' ? 'active' : ''}>
            <button onClick={() => setActiveSection('productos')}>
              <span className="menu-icon">📦</span>
              Productos
            </button>
          </li>
          <li className={activeSection === 'proveedores' ? 'active' : ''}>
            <button onClick={() => setActiveSection('proveedores')}>
              <span className="menu-icon">🏢</span>
              Proveedores
            </button>
          </li>
          <li className={activeSection === 'clientes' ? 'active' : ''}>
            <button onClick={() => setActiveSection('clientes')}>
              <span className="menu-icon">👥</span>
              Clientes
            </button>
          </li>
        </ul>
      </nav>
      
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Bienvenido, {user?.first_name || user?.username}</h1>
            <p>Email: {user?.email}</p>
          </div>
          <div className="header-right">
            <button className="logout-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </header>
        
        {renderSectionContent()}
      </main>
    </div>
  );
};

export default Dashboard;


// src/components/Dashboard.jsx

import React, { useState, useEffect, useRef } from "react";

import {
  Bell,
  Search,
  Menu,
  Server,
  AlertTriangle,
  CheckCircle2,
  Users,
  ShieldCheck,
  Activity,
  Database,
  Wifi,
  Cpu,
  MonitorSmartphone,
  Clock3,
  Send,
  Bot,
} from "lucide-react";

const Dashboard = () => {

  // =====================================================
  // STATES
  // =====================================================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 I am your AI IT Support Assistant. Ask me anything about VPN, WiFi, Password Reset, Leave Policy, POS, RF Devices or Incidents.",
    },
  ]);

  const messagesEndRef = useRef(null);

  // =====================================================
  // DASHBOARD DATA
  // =====================================================

  const [dashboardData, setDashboardData] = useState({
    ticketsOpen: 128,
    resolvedToday: 76,
    criticalAlerts: 8,
    activeUsers: 342,
    serverHealth: 98,
    networkStatus: "Stable",

    incidents: [
      {
        id: 1,
        title: "VPN Connectivity Issue",
        priority: "Critical",
        time: "10 mins ago",
      },
      {
        id: 2,
        title: "POS Server Restart Required",
        priority: "Medium",
        time: "25 mins ago",
      },
      {
        id: 3,
        title: "RF Device Sync Delayed",
        priority: "Low",
        time: "1 hour ago",
      },
    ],
  });

  // =====================================================
  // AUTO SCROLL CHAT
  // =====================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // =====================================================
  // CHATBOT SEND
  // =====================================================

  const handleSend = async () => {

  if (!query.trim()) return;

  const userMessage = {
    sender: "user",
    text: query,
  };

  setMessages((prev) => [...prev, userMessage]);

  const currentQuery = query;

  setQuery("");

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: currentQuery,
        }),
      }
    );

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: data.answer || data.error,
      },
    ]);

  } catch (error) {

    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: " Failed to connect to backend.",
      },
    ]);
  }
};

  // =====================================================
  // DASHBOARD STATS
  // =====================================================

  const stats = [
    {
      title: "Open Tickets",
      value: dashboardData.ticketsOpen,
      icon: AlertTriangle,
      className: "red",
    },

    {
      title: "Resolved Today",
      value: dashboardData.resolvedToday,
      icon: CheckCircle2,
      className: "green",
    },

    {
      title: "Critical Alerts",
      value: dashboardData.criticalAlerts,
      icon: ShieldCheck,
      className: "yellow",
    },

    {
      title: "Active Users",
      value: dashboardData.activeUsers,
      icon: Users,
      className: "blue",
    },
  ];

  // =====================================================
  // SYSTEMS
  // =====================================================

  const systems = [
    {
      name: "Main Application Server",
      status: "Online",
      icon: Server,
    },

    {
      name: "Database Cluster",
      status: "Healthy",
      icon: Database,
    },

    {
      name: "Network Monitoring",
      status: "Stable",
      icon: Wifi,
    },

    {
      name: "POS Devices",
      status: "Operational",
      icon: MonitorSmartphone,
    },
  ];

  // =====================================================
  // JSX
  // =====================================================

  return (
    <>
      <style>{`

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:Arial,sans-serif;
        }

        body{
          background:#050816;
          color:white;
        }

        .dashboard{
          display:flex;
          min-height:100vh;
          background:#050816;
        }

        /* SIDEBAR */

        .sidebar{
          width:260px;
          background:#0b1120;
          border-right:1px solid #1e293b;
          padding:20px;
          transition:0.3s;
        }

        .logo h2{
          margin-bottom:5px;
        }

        .logo p{
          color:#94a3b8;
          font-size:14px;
        }

        .sidebar nav{
          margin-top:30px;
        }

        .sidebar nav a{
          display:block;
          padding:14px;
          margin-bottom:10px;
          text-decoration:none;
          color:white;
          border-radius:12px;
          transition:0.3s;
        }

        .sidebar nav a:hover{
          background:#1e293b;
        }

        /* MAIN */

        .main{
          flex:1;
        }

        /* HEADER */

        .header{
          height:80px;
          border-bottom:1px solid #1e293b;
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:0 30px;
          background:rgba(10,15,31,0.95);
          position:sticky;
          top:0;
          z-index:100;
        }

        .header-left{
          display:flex;
          align-items:center;
          gap:20px;
        }

        .menu-btn{
          display:none;
          background:none;
          border:none;
          color:white;
          cursor:pointer;
        }

        .search-box{
          background:#111827;
          border:1px solid #334155;
          padding:10px 15px;
          border-radius:12px;
          display:flex;
          align-items:center;
          width:350px;
        }

        .search-box input{
          background:transparent;
          border:none;
          outline:none;
          margin-left:10px;
          color:white;
          width:100%;
        }

        .header-right{
          display:flex;
          align-items:center;
          gap:20px;
        }

        .profile{
          width:42px;
          height:42px;
          border-radius:50%;
          background:linear-gradient(to right,#06b6d4,#2563eb);
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:bold;
        }

        /* CONTENT */

        .content{
          padding:30px;
        }

        .page-title h1{
          font-size:32px;
        }

        .page-title p{
          color:#94a3b8;
          margin-top:10px;
        }

        /* STATS */

        .stats-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(230px,1fr));
          gap:20px;
          margin-top:30px;
        }

        .stat-card{
          background:#0f172a;
          border:1px solid #1e293b;
          border-radius:20px;
          padding:25px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          transition:0.3s;
        }

        .stat-card:hover{
          transform:translateY(-5px);
          border-color:#06b6d4;
        }

        .stat-card p{
          color:#94a3b8;
        }

        .stat-card h2{
          margin-top:10px;
          font-size:34px;
        }

        .icon-box{
          padding:18px;
          border-radius:18px;
        }

        .red{
          background:linear-gradient(to right,#ef4444,#991b1b);
        }

        .green{
          background:linear-gradient(to right,#22c55e,#166534);
        }

        .yellow{
          background:linear-gradient(to right,#facc15,#ea580c);
        }

        .blue{
          background:linear-gradient(to right,#3b82f6,#1d4ed8);
        }

        /* MIDDLE GRID */

        .middle-grid{
          display:grid;
          grid-template-columns:2fr 1fr;
          gap:20px;
          margin-top:30px;
        }

        .card{
          background:#0f172a;
          border:1px solid #1e293b;
          border-radius:20px;
          padding:25px;
        }

        .card-header{
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .live{
          display:flex;
          align-items:center;
          gap:6px;
          color:#22c55e;
        }

        .systems{
          margin-top:20px;
        }

        .system-card{
          background:#111827;
          border:1px solid #334155;
          border-radius:15px;
          padding:18px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:15px;
        }

        .system-left{
          display:flex;
          align-items:center;
          gap:15px;
        }

        .system-icon{
          background:rgba(6,182,212,0.2);
          color:#22d3ee;
          padding:12px;
          border-radius:12px;
        }

        .status{
          color:#22c55e;
          font-weight:bold;
        }

        /* HEALTH CARD */

        .health-card{
          background:linear-gradient(to bottom right,#0891b2,#1d4ed8);
          border-radius:20px;
          padding:25px;
        }

        .health-top{
          display:flex;
          justify-content:space-between;
        }

        .health-top h1{
          font-size:56px;
          margin-top:10px;
        }

        .progress-section{
          margin-top:50px;
        }

        .progress-info{
          display:flex;
          justify-content:space-between;
          margin-bottom:10px;
        }

        .progress-bar{
          height:12px;
          background:rgba(255,255,255,0.3);
          border-radius:20px;
          overflow:hidden;
        }

        .progress-fill{
          height:100%;
          background:white;
        }

        .network-status{
          margin-top:20px;
        }

        /* INCIDENTS */

        .incidents-card{
          margin-top:30px;
        }

        .table-wrapper{
          overflow-x:auto;
          margin-top:20px;
        }

        table{
          width:100%;
          border-collapse:collapse;
        }

        th,td{
          padding:18px 10px;
          text-align:left;
        }

        thead{
          border-bottom:1px solid #334155;
          color:#94a3b8;
        }

        tbody tr{
          border-bottom:1px solid #1e293b;
        }

        .priority{
          padding:6px 12px;
          border-radius:20px;
          font-size:13px;
        }

        .priority.critical{
          background:rgba(239,68,68,0.2);
          color:#f87171;
        }

        .priority.medium{
          background:rgba(250,204,21,0.2);
          color:#fde047;
        }

        .priority.low{
          background:rgba(34,197,94,0.2);
          color:#4ade80;
        }

        .investigating{
          display:flex;
          align-items:center;
          gap:6px;
          color:#22d3ee;
        }

        /* CHATBOT */

        .chatbot-container{
          margin-top:30px;
          background:#0f172a;
          border:1px solid #1e293b;
          border-radius:20px;
          height:600px;
          display:flex;
          flex-direction:column;
          overflow:hidden;
        }

        .chatbot-header{
          padding:20px;
          border-bottom:1px solid #1e293b;
          display:flex;
          align-items:center;
          gap:10px;
          background:#111827;
        }

        .chat-messages{
          flex:1;
          overflow-y:auto;
          padding:20px;
        }

        .message{
          display:flex;
          margin-bottom:20px;
        }

        .message.user{
          justify-content:flex-end;
        }

        .message-content{
          max-width:70%;
          padding:14px;
          border-radius:15px;
          line-height:1.5;
          white-space:pre-wrap;
        }

        .bot .message-content{
          background:#1e293b;
        }

        .user .message-content{
          background:#2563eb;
        }

        .chat-input{
          border-top:1px solid #1e293b;
          padding:15px;
          display:flex;
          gap:10px;
          background:#111827;
        }

        .chat-input input{
          flex:1;
          background:#1e293b;
          border:none;
          outline:none;
          color:white;
          padding:14px;
          border-radius:12px;
        }

        .send-btn{
          background:#06b6d4;
          border:none;
          width:55px;
          border-radius:12px;
          color:white;
          cursor:pointer;
        }

        .send-btn:hover{
          background:#0891b2;
        }

        /* RESPONSIVE */

        @media(max-width:992px){

          .middle-grid{
            grid-template-columns:1fr;
          }

          .search-box{
            width:250px;
          }
        }

        @media(max-width:768px){

          .sidebar{
            position:fixed;
            left:-280px;
            top:0;
            height:100%;
            z-index:1000;
          }

          .sidebar.open{
            left:0;
          }

          .menu-btn{
            display:block;
          }

          .search-box{
            display:none;
          }

          .content{
            padding:20px;
          }

          .page-title h1{
            font-size:24px;
          }

          .message-content{
            max-width:90%;
          }
        }

      `}</style>

      <div className="dashboard">

        {/* SIDEBAR */}

        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>

          <div className="logo">
            <h2>IT Support Hub</h2>
            <p>AI Powered RAG Dashboard</p>
          </div>

          <nav>
            <a href="/">Dashboard</a>
            <a href="/">Incidents</a>
            <a href="/">Infrastructure</a>
            <a href="/">AI Chatbot</a>
            <a href="/">Analytics</a>
            <a href="/">Settings</a>
          </nav>

        </aside>

        {/* MAIN */}

        <div className="main">

          {/* HEADER */}

          <header className="header">

            <div className="header-left">

              <button
                className="menu-btn"
                onClick={() =>
                  setSidebarOpen(!sidebarOpen)
                }
              >
                <Menu />
              </button>

              <div className="search-box">

                <Search size={18} />

                <input
                  type="text"
                  placeholder="Search tickets, systems..."
                />

              </div>
            </div>

            <div className="header-right">

              <Bell />

              <div className="profile">
                IT
              </div>

            </div>
          </header>

          {/* CONTENT */}

          <div className="content">

            <div className="page-title">

              <h1>
                AI Powered IT Support Dashboard
              </h1>

              <p>
                React + FastAPI + FAISS + RAG + AI Chatbot
              </p>

            </div>

            {/* STATS */}

            <div className="stats-grid">

              {stats.map((item, index) => {

                const Icon = item.icon;

                return (
                  <div className="stat-card" key={index}>

                    <div>
                      <p>{item.title}</p>
                      <h2>{item.value}</h2>
                    </div>

                    <div className={`icon-box ${item.className}`}>
                      <Icon size={28} />
                    </div>

                  </div>
                );
              })}

            </div>

            {/* MIDDLE */}

            <div className="middle-grid">

              {/* INFRA */}

              <div className="card">

                <div className="card-header">

                  <h3>Infrastructure Status</h3>

                  <div className="live">
                    <Activity size={16} />
                    Live
                  </div>

                </div>

                <div className="systems">

                  {systems.map((system, index) => {

                    const Icon = system.icon;

                    return (
                      <div className="system-card" key={index}>

                        <div className="system-left">

                          <div className="system-icon">
                            <Icon size={22} />
                          </div>

                          <div>
                            <h4>{system.name}</h4>
                            <p>System operational</p>
                          </div>

                        </div>

                        <span className="status">
                          {system.status}
                        </span>

                      </div>
                    );
                  })}

                </div>

              </div>

              {/* HEALTH */}

              <div className="health-card">

                <div className="health-top">

                  <div>
                    <p>Server Health</p>
                    <h1>{dashboardData.serverHealth}%</h1>
                  </div>

                  <Cpu size={55} />

                </div>

                <div className="progress-section">

                  <div className="progress-info">
                    <span>Performance</span>
                    <span>Excellent</span>
                  </div>

                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${dashboardData.serverHealth}%`,
                      }}
                    ></div>

                  </div>

                  <p className="network-status">
                    Network Status:
                    {" "}
                    {dashboardData.networkStatus}
                  </p>

                </div>

              </div>

            </div>

            {/* INCIDENTS */}

            <div className="card incidents-card">

              <div className="card-header">
                <h3>Recent Incidents</h3>
              </div>

              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>
                      <th>Issue</th>
                      <th>Priority</th>
                      <th>Reported</th>
                      <th>Status</th>
                    </tr>

                  </thead>

                  <tbody>

                    {dashboardData.incidents.map((incident) => (

                      <tr key={incident.id}>

                        <td>{incident.title}</td>

                        <td>
                          <span
                            className={`priority ${incident.priority.toLowerCase()}`}
                          >
                            {incident.priority}
                          </span>
                        </td>

                        <td>{incident.time}</td>

                        <td>

                          <div className="investigating">
                            <Clock3 size={16} />
                            Investigating
                          </div>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            {/* CHATBOT */}

            <div className="chatbot-container">

              <div className="chatbot-header">

                <Bot />

                <h3>
                  AI IT Support Chatbot
                </h3>

              </div>

              <div className="chat-messages">

                {messages.map((msg, index) => (

                  <div
                    key={index}
                    className={`message ${msg.sender}`}
                  >

                    <div className="message-content">
                      {msg.text}
                    </div>

                  </div>
                ))}

                <div ref={messagesEndRef}></div>

              </div>

              <div className="chat-input">

                <input
                  type="text"
                  placeholder="Ask about VPN, WiFi, Leave Policy..."
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSend()
                  }
                />

                <button
                  className="send-btn"
                  onClick={handleSend}
                >
                  <Send size={20} />
                </button>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
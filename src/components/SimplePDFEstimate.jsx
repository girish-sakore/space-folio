import React from 'react';

const SimplePDFEstimate = React.forwardRef(({
  selectedServices,
  services,
  projectComplexity,
  timeline,
  supportLevel,
  totalPrice,
  complexityMultipliers,
  timelineMultipliers,
  supportLevels,
  getSelectedServicesFeatures,
  estimateId,
  id
}, ref) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const styles = {
    container: {
      backgroundColor: 'white',
      color: '#1f2937',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      lineHeight: '1.5',
      maxWidth: '800px',
      margin: '0 auto'
    },
    header: {
      borderBottom: '3px solid #14b8a6',
      paddingBottom: '20px',
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0 0 10px 0'
    },
    companyName: {
      color: '#14b8a6',
      fontSize: '16px',
      fontWeight: 'bold',
      margin: '0 0 5px 0'
    },
    tagline: {
      color: '#6b7280',
      fontSize: '12px',
      margin: '0'
    },
    estimateBox: {
      backgroundColor: '#f0fdfa',
      border: '1px solid #a7f3d0',
      borderRadius: '8px',
      padding: '15px',
      textAlign: 'center',
      minWidth: '150px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '15px',
      paddingBottom: '8px',
      borderBottom: '1px solid #e5e7eb'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px'
    },
    tableHeader: {
      backgroundColor: '#f9fafb',
      padding: '10px',
      textAlign: 'left',
      borderBottom: '1px solid #e5e7eb',
      fontWeight: 'bold'
    },
    tableCell: {
      padding: '10px',
      borderBottom: '1px solid #f3f4f6'
    },
    totalRow: {
      backgroundColor: '#f0fdfa',
      fontWeight: 'bold',
      fontSize: '16px'
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px'
    },
    checkmark: {
      color: '#10b981',
      marginRight: '8px',
      fontWeight: 'bold'
    },
    section: {
      marginBottom: '30px'
    }
  };

  return (
    <div ref={ref} id={id} style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Project Estimate</h1>
          <div style={styles.companyName}>Proxima Centauri Cloud Solutions</div>
          <div style={styles.tagline}>Expert Technology Solutions & Consulting</div>
        </div>
        <div style={styles.estimateBox}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '5px' }}>Estimate ID</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#14b8a6' }}>{estimateId}</div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '10px' }}>{currentDate}</div>
        </div>
      </div>

      {/* Project Overview */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>1. Project Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
          <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '5px' }}>Complexity Level</div>
            <div style={{ fontWeight: 'bold' }}>{complexityMultipliers[projectComplexity]?.label}</div>
            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '5px' }}>
              {complexityMultipliers[projectComplexity]?.description}
            </div>
          </div>
          <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '5px' }}>Timeline</div>
            <div style={{ fontWeight: 'bold' }}>{timelineMultipliers[timeline]?.label}</div>
            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '5px' }}>
              {timelineMultipliers[timeline]?.description}
            </div>
          </div>
          <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '5px' }}>Support Level</div>
            <div style={{ fontWeight: 'bold' }}>{supportLevels[supportLevel]?.label}</div>
            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '5px' }}>
              {supportLevels[supportLevel]?.description}
            </div>
          </div>
        </div>
      </div>

      {/* Services Breakdown */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>2. Services Breakdown</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Service</th>
              <th style={styles.tableHeader}>Description</th>
              <th style={{ ...styles.tableHeader, textAlign: 'center' }}>Base Price</th>
              <th style={{ ...styles.tableHeader, textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {selectedServices.map((serviceId, index) => {
              const service = services.find(s => s.id === serviceId);
              const adjustedPrice = service.basePrice * service.complexity[projectComplexity];

              return (
                <tr key={serviceId} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                  <td style={styles.tableCell}>
                    <strong>{service.icon} {service.name}</strong>
                  </td>
                  <td style={styles.tableCell}>{service.description}</td>
                  <td style={{ ...styles.tableCell, textAlign: 'center' }}>
                    ${service.basePrice.toLocaleString()}
                  </td>
                  <td style={{ ...styles.tableCell, textAlign: 'right', fontWeight: 'bold' }}>
                    ${adjustedPrice.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Features Included */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>3. Features Included</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {getSelectedServicesFeatures().map((feature, index) => (
            <div key={index} style={styles.feature}>
              <span style={styles.checkmark}>✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Calculation */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>4. Price Calculation</h2>
        <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px' }}>
          <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Services Subtotal:</span>
            <span style={{ fontWeight: 'bold' }}>
              ${selectedServices.reduce((total, serviceId) => {
                const service = services.find(s => s.id === serviceId);
                return total + (service.basePrice * service.complexity[projectComplexity]);
              }, 0).toLocaleString()}
            </span>
          </div>
          <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Timeline Adjustment ({timelineMultipliers[timeline]?.label}):</span>
            <span style={{ fontWeight: 'bold' }}>×{timelineMultipliers[timeline]?.multiplier}</span>
          </div>
          <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Support Level ({supportLevels[supportLevel]?.label}):</span>
            <span style={{ fontWeight: 'bold' }}>+${supportLevels[supportLevel]?.price}/month</span>
          </div>
          <div style={{
            borderTop: '2px solid #e5e7eb',
            paddingTop: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            <span>Total Project Cost:</span>
            <span style={{ color: '#14b8a6' }}>${totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>5. Terms & Conditions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '12px' }}>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Estimate Validity</h4>
            <ul style={{ paddingLeft: '15px', margin: 0 }}>
              <li>This estimate is valid for 30 days</li>
              <li>Final pricing may vary based on detailed requirements</li>
              <li>Scope changes may affect final cost</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Payment Terms</h4>
            <ul style={{ paddingLeft: '15px', margin: 0 }}>
              <li>50% upfront payment to commence work</li>
              <li>Milestone-based payments available</li>
              <li>Final 20% upon project completion</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>What's Included</h4>
            <ul style={{ paddingLeft: '15px', margin: 0 }}>
              <li>Project management & communication</li>
              <li>Quality assurance & testing</li>
              <li>Documentation & training</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Support & Warranty</h4>
            <ul style={{ paddingLeft: '15px', margin: 0 }}>
              <li>3-month warranty on all work</li>
              <li>Bug fixes & minor adjustments included</li>
              <li>Ongoing support plans available</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>Contact Information</h4>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              <div style={{ marginBottom: '5px' }}>📧 info@proximacloud.in</div>
              <div style={{ marginBottom: '5px' }}>📞 +91-77987-29845</div>
              <div style={{ marginBottom: '5px' }}>🏢 Ramtek, Nagpur, India</div>
              <div>🌐 proximacloud.com</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ backgroundColor: '#f0fdfa', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '15px' }}>
              <div style={{ fontWeight: 'bold', color: '#14b8a6', marginBottom: '5px' }}>Ready to Get Started?</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                Contact us to discuss your project details and get a comprehensive proposal.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SimplePDFEstimate.displayName = 'SimplePDFEstimate';

export default SimplePDFEstimate;
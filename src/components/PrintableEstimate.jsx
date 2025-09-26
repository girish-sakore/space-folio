import React from 'react';

const PrintableEstimate = React.forwardRef(({
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
  estimateId
}, ref) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: 'white',
        color: '#1f2937',
        padding: '32px',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        lineHeight: '1.5',
        fontSize: '14px',
        maxWidth: '210mm', // A4 width
        margin: '0 auto',
        minHeight: '297mm' // A4 height
      }}
    >
      {/* Header */}
      <div style={{
        borderBottom: '4px solid #14b8a6',
        paddingBottom: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '8px'
            }}>
              Project Estimate
            </h1>
            <div style={{
              color: '#14b8a6',
              fontWeight: '600',
              fontSize: '18px'
            }}>
              Proxima Centauri Cloud Solutions
            </div>
            <div style={{
              color: '#6b7280',
              fontSize: '14px',
              marginTop: '4px'
            }}>
              Expert Technology Solutions & Consulting
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              backgroundColor: '#f0fdfa',
              border: '1px solid #a7f3d0',
              borderRadius: '8px',
              padding: '12px'
            }}>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Estimate ID</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#14b8a6' }}>{estimateId}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>{currentDate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
            1
          </span>
          Project Overview
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Complexity Level</div>
            <div className="font-semibold text-gray-900 text-sm">
              {complexityMultipliers[projectComplexity]?.label}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {complexityMultipliers[projectComplexity]?.description}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Timeline</div>
            <div className="font-semibold text-gray-900 text-sm">
              {timelineMultipliers[timeline]?.label}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {timelineMultipliers[timeline]?.description}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Support Level</div>
            <div className="font-semibold text-gray-900 text-sm">
              {supportLevels[supportLevel]?.label}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {supportLevels[supportLevel]?.description}
            </div>
          </div>
        </div>
      </div>

      {/* Services Breakdown */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
            2
          </span>
          Services Breakdown
        </h2>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <div className="grid grid-cols-4 gap-4 font-semibold text-gray-900 text-sm">
              <div>Service</div>
              <div>Description</div>
              <div className="text-center">Base Price</div>
              <div className="text-right">Total</div>
            </div>
          </div>

          {selectedServices.map((serviceId, index) => {
            const service = services.find(s => s.id === serviceId);
            const adjustedPrice = service.basePrice * service.complexity[projectComplexity];

            return (
              <div key={serviceId} className={`px-4 py-3 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="grid grid-cols-4 gap-4 items-center text-sm">
                  <div>
                    <div className="font-semibold text-gray-900 flex items-center">
                      <span className="mr-2">{service.icon}</span>
                      {service.name}
                    </div>
                  </div>
                  <div className="text-gray-600 text-xs">
                    {service.description}
                  </div>
                  <div className="text-center text-gray-700">
                    ${service.basePrice.toLocaleString()}
                  </div>
                  <div className="text-right font-semibold text-gray-900">
                    ${adjustedPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Included */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
            3
          </span>
          Features Included
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {getSelectedServicesFeatures().map((feature, index) => (
            <div key={index} className="flex items-center">
              <span className="w-4 h-4 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                ✓
              </span>
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Calculation */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
            4
          </span>
          Price Calculation
        </h2>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-2 text-sm">
            {/* Service Subtotal */}
            <div className="flex justify-between">
              <span className="text-gray-700">Services Subtotal:</span>
              <span className="font-semibold">
                ${selectedServices.reduce((total, serviceId) => {
                  const service = services.find(s => s.id === serviceId);
                  return total + (service.basePrice * service.complexity[projectComplexity]);
                }, 0).toLocaleString()}
              </span>
            </div>

            {/* Timeline Adjustment */}
            <div className="flex justify-between">
              <span className="text-gray-700">
                Timeline Adjustment ({timelineMultipliers[timeline]?.label}):
              </span>
              <span className="font-semibold">
                ×{timelineMultipliers[timeline]?.multiplier}
              </span>
            </div>

            {/* Support Adjustment */}
            <div className="flex justify-between">
              <span className="text-gray-700">
                Support Level ({supportLevels[supportLevel]?.label}):
              </span>
              <span className="font-semibold">
                +${supportLevels[supportLevel]?.price}/month
              </span>
            </div>

            <hr className="border-gray-300 my-3" />

            {/* Total */}
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-900">Total Project Cost:</span>
              <span className="text-teal-600">${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
            5
          </span>
          Terms & Conditions
        </h2>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Estimate Validity</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• This estimate is valid for 30 days</li>
                <li>• Final pricing may vary based on detailed requirements</li>
                <li>• Scope changes may affect final cost</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Payment Terms</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• 50% upfront payment to commence work</li>
                <li>• Milestone-based payments available</li>
                <li>• Final 20% upon project completion</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What's Included</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Project management & communication</li>
                <li>• Quality assurance & testing</li>
                <li>• Documentation & training</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Support & Warranty</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• 3-month warranty on all work</li>
                <li>• Bug fixes & minor adjustments included</li>
                <li>• Ongoing support plans available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Contact Information</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>📧 info@proximacloud.in</div>
              <div>📞 +91-77987-29845</div>
              <div>🏢 Ramtek, Nagpur, India</div>
              <div>🌐 proximacloud.in</div>
            </div>
          </div>

          <div className="text-right">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
              <div className="font-semibold text-teal-600 mb-1 text-sm">Ready to Get Started?</div>
              <div className="text-xs text-gray-600">
                Contact us to discuss your project details and get a comprehensive proposal.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

PrintableEstimate.displayName = 'PrintableEstimate';

export default PrintableEstimate;
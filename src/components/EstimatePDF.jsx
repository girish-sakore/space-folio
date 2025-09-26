import React from 'react';

const EstimatePDF = ({
  selectedServices,
  services,
  projectComplexity,
  timeline,
  supportLevel,
  totalPrice,
  complexityMultipliers,
  timelineMultipliers,
  supportLevels,
  getSelectedServicesFeatures
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const estimateId = `EST-${Date.now().toString().slice(-6)}`;

  return (
    <div
      id="pdf-estimate"
      className="bg-white text-gray-900 min-h-screen"
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        lineHeight: '1.5',
        color: '#1f2937'
      }}
    >
      {/* Header */}
      <div className="border-b-4 border-teal-500 pb-8 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Project Estimate
            </h1>
            <div className="text-teal-600 font-semibold text-lg">
              Proxima Centauri Cloud Solutions
            </div>
            <div className="text-gray-600 text-sm mt-1">
              Expert Technology Solutions & Consulting
            </div>
          </div>
          <div className="text-right">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Estimate ID</div>
              <div className="text-lg font-bold text-teal-600">{estimateId}</div>
              <div className="text-sm text-gray-600 mt-2">{currentDate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
            1
          </span>
          Project Overview
        </h2>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Complexity Level</div>
            <div className="font-semibold text-gray-900">
              {complexityMultipliers[projectComplexity]?.label}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {complexityMultipliers[projectComplexity]?.description}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Timeline</div>
            <div className="font-semibold text-gray-900">
              {timelineMultipliers[timeline]?.label}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {timelineMultipliers[timeline]?.description}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Support Level</div>
            <div className="font-semibold text-gray-900">
              {supportLevels[supportLevel]?.label}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {supportLevels[supportLevel]?.description}
            </div>
          </div>
        </div>
      </div>

      {/* Services Breakdown */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
            2
          </span>
          Services Breakdown
        </h2>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="grid grid-cols-4 gap-4 font-semibold text-gray-900">
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
              <div key={serviceId} className={`px-6 py-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div>
                    <div className="font-semibold text-gray-900 flex items-center">
                      <span className="mr-2 text-lg">{service.icon}</span>
                      {service.name}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
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
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
            3
          </span>
          Features Included
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {getSelectedServicesFeatures().map((feature, index) => (
            <div key={index} className="flex items-center">
              <span className="w-5 h-5 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                ✓
              </span>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Calculation */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
            4
          </span>
          Price Calculation
        </h2>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="space-y-3">
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

            <hr className="border-gray-300" />

            {/* Total */}
            <div className="flex justify-between text-xl font-bold">
              <span className="text-gray-900">Total Project Cost:</span>
              <span className="text-teal-600">${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
            5
          </span>
          Terms & Conditions
        </h2>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-2 gap-8 text-sm">
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
      <div className="border-t border-gray-200 pt-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>📧 info@proximacloud.in</div>
              <div>📞 +91-77987-29845</div>
              <div>🏢 Ramtek, Nagpur, India</div>
              <div>🌐 proximacloud.in</div>
            </div>
          </div>

          <div className="text-right">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <div className="font-semibold text-teal-600 mb-2">Ready to Get Started?</div>
              <div className="text-sm text-gray-600">
                Contact us to discuss your project details and get a comprehensive proposal.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatePDF;
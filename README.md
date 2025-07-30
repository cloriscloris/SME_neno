# Neno - Smart Business Financial Management System

## Overview

Neno is a comprehensive financial management and ERP-like system designed specifically for small and medium-sized businesses. Built with a focus on simplicity, modern design, and powerful automation, Neno streamlines financial operations through intelligent categorization, automated invoice matching, and seamless third-party integrations.

## Architecture Overview

### Core Technology Stack

- **Frontend**: Single-page HTML application with vanilla JavaScript
- **Styling**: Custom CSS with glassmorphism effects and Tailwind-inspired design
- **Backend**: API integrations with external services
- **Database**: Local storage and session management
- **Deployment**: Static file hosting with local HTTP server

### System Architecture

```
Neno Application
├── Frontend Layer
│   ├── Dashboard Interface
│   ├── Transaction Management
│   ├── Invoice Processing
│   ├── Account Connections
│   └── Settings & Preferences
├── Integration Layer
│   ├── Wise API Integration
│   ├── Gmail API Integration
│   └── Third-party Service Connectors
├── Business Logic Layer
│   ├── Transaction Categorization
│   ├── Invoice Matching Engine
│   ├── Auto-categorization Rules
│   └── Financial Analytics
└── Data Layer
    ├── Local Storage
    ├── Session Management
    └── Cache Management
```

## Key Features

### Financial Dashboard
- Real-time financial overview with key metrics
- Monthly income and expense tracking
- Net income calculations
- Transaction volume monitoring
- Visual data representation with glassmorphism UI

### Transaction Management
- Automated transaction categorization
- Manual transaction entry and editing
- Category-based filtering and organization
- Transaction status tracking (categorized, matched, pending)
- Historical transaction analysis

### Invoice Processing
- Gmail integration for automatic invoice retrieval
- Manual invoice entry system
- Invoice-to-transaction matching
- Invoice status management
- Document processing and storage

### Account Integration
- Wise API integration for transaction data
- Gmail API for invoice retrieval
- Secure token-based authentication
- Real-time synchronization
- Connection status monitoring

### Business Settings
- Auto-categorization rule management
- Contract template creation and management
- Business automation rules
- Default currency and tax rate settings
- Invoice numbering and payment terms configuration

## Technical Implementation

### Frontend Design
- **Glassmorphism UI**: Modern translucent design with backdrop blur effects
- **Responsive Layout**: Fixed sidebar with dynamic content area
- **Interactive Elements**: Hover effects, smooth transitions, and micro-animations
- **Color Scheme**: Clean blue palette with white accents
- **Typography**: Apple-inspired system fonts for optimal readability

### Data Flow
1. **Data Ingestion**: Wise API provides transaction data
2. **Processing**: Automatic categorization based on business rules
3. **Matching**: Invoice-to-transaction correlation
4. **Storage**: Local data persistence and session management
5. **Presentation**: Real-time dashboard updates

### Security Features
- Token-based API authentication
- Local data storage (no cloud dependencies)
- Secure connection handling
- Input validation and sanitization

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local HTTP server capability
- API tokens for Wise and Gmail integration

### Quick Start
1. Clone the repository
2. Open `index.html` in a web browser
3. Configure API tokens in the Accounts section
4. Start managing your business finances

### Local Development
```bash
# Start local HTTP server
python -m http.server 8000

# Access application
open http://localhost:8000
```

## API Integrations

### Wise Integration
- **Purpose**: Transaction data retrieval
- **Authentication**: Token-based
- **Data**: Income, expenses, account balances
- **Frequency**: Real-time synchronization

### Gmail Integration
- **Purpose**: Invoice document retrieval
- **Authentication**: OAuth 2.0
- **Data**: Email attachments, invoice PDFs
- **Processing**: Automatic document parsing

## Business Logic

### Auto-categorization Engine
- Rule-based transaction classification
- Keyword matching algorithms
- Amount-based categorization
- Merchant name analysis
- Custom category creation

### Invoice Matching System
- Document content extraction
- Amount and date matching
- Vendor name correlation
- Confidence scoring
- Manual override capabilities

### Financial Analytics
- Monthly trend analysis
- Category spending patterns
- Income source tracking
- Expense optimization insights
- Cash flow forecasting

## User Interface Components

### Navigation Structure
- **Dashboard**: Financial overview and key metrics
- **Accounts**: API connection management
- **Transactions**: Transaction list and management
- **Invoices**: Invoice processing and matching
- **Preferences**: Business settings and automation

### Interactive Elements
- **Cards**: Glassmorphism-styled information containers
- **Buttons**: Primary, secondary, and success action buttons
- **Forms**: Input fields with validation and focus states
- **Modals**: Overlay dialogs for detailed interactions
- **Status Indicators**: Visual connection and processing status

## Performance Considerations

### Optimization Strategies
- Minimal JavaScript footprint
- Efficient DOM manipulation
- Optimized CSS animations
- Local data caching
- Lazy loading for large datasets

### Browser Compatibility
- Modern ES6+ JavaScript features
- CSS Grid and Flexbox layouts
- Backdrop filter support
- Local storage API
- Fetch API for HTTP requests

## Future Enhancements

### Planned Features
- Multi-currency support
- Advanced reporting and analytics
- Export capabilities (PDF, CSV)
- Mobile application
- Cloud synchronization
- Multi-user collaboration

### Technical Roadmap
- Progressive Web App (PWA) implementation
- Service worker for offline functionality
- IndexedDB for enhanced local storage
- WebSocket for real-time updates
- Advanced data visualization

## Contributing

### Development Guidelines
- Maintain glassmorphism design principles
- Follow vanilla JavaScript best practices
- Ensure responsive design compatibility
- Implement proper error handling
- Add comprehensive documentation

### Code Structure
- Modular JavaScript functions
- Semantic HTML markup
- Organized CSS with clear naming conventions
- Consistent code formatting
- Performance-focused implementation

## License

This project is proprietary software developed for business financial management. All rights reserved.

## Support

For technical support and feature requests, please contact the development team through the appropriate channels.

---

*Neno - Streamlining business financial management with intelligent automation and modern design.* 
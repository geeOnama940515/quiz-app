# Programming Quiz Application

A comprehensive quiz application for assessing programming knowledge in HTML, C# basics, and algorithms. Designed specifically for intern evaluation with professional reporting capabilities.

## Features

- **Multi-topic Assessment**: HTML, C# fundamentals, and algorithm questions
- **Professional Interface**: Clean, modern design with progress tracking
- **PDF Report Generation**: Detailed and summary reports downloadable as PDF
- **Real-time Scoring**: Immediate feedback with explanations
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Docker Deployment**: Easy containerized deployment with optional services

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Docker Deployment

### Basic Deployment

```bash
# Build and run the application
docker-compose up -d quiz-app
```

### Production Deployment with Nginx

```bash
# Run with nginx reverse proxy
docker-compose --profile production up -d
```

### Full Stack with Database

```bash
# Run with PostgreSQL database for result storage
docker-compose --profile with-database up -d
```

### All Services

```bash
# Run all services (app, nginx, postgres, redis)
docker-compose --profile production --profile with-database --profile with-cache up -d
```

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Database connection (if using with-database profile)
DATABASE_URL=postgresql://quiz_user:quiz_password@localhost:5432/quiz_results

# Optional: Redis connection (if using with-cache profile)
REDIS_URL=redis://localhost:6379
```

### Docker Compose Profiles

- **Default**: Just the quiz application
- **production**: Adds nginx reverse proxy
- **with-database**: Adds PostgreSQL for result storage
- **with-cache**: Adds Redis for session management

## PDF Reports

The application generates two types of PDF reports:

1. **Detailed Report**: Complete assessment with all questions, answers, and explanations
2. **Summary Report**: Quick overview with scores and topic breakdown

## Security Features

- Rate limiting via nginx
- Security headers
- Input validation
- XSS protection
- CSRF protection ready

## Monitoring and Analytics

When using the database profile, the application creates:

- `quiz_results` table for storing all assessment data
- `quiz_analytics` view for performance insights
- Indexes for optimal query performance

## Customization

### Adding Questions

Edit `lib/questions.ts` to add or modify questions:

```typescript
{
  id: 16,
  topic: 'HTML',
  question: 'Your question here?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 0,
  explanation: 'Explanation of the correct answer'
}
```

### Styling

The application uses Tailwind CSS with shadcn/ui components. Customize:

- Colors in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Component styles in individual component files

## Production Deployment

### SSL Configuration

1. Obtain SSL certificates
2. Place them in `./ssl/` directory
3. Uncomment HTTPS configuration in `nginx.conf`
4. Update server_name with your domain

### Database Setup

For production database usage:

1. Change default passwords in `docker-compose.yml`
2. Set up proper backup strategies
3. Configure connection pooling if needed

### Scaling

The application can be scaled horizontally:

```bash
docker-compose up -d --scale quiz-app=3
```

## API Endpoints (Future Enhancement)

The application is ready for API integration:

- `POST /api/results` - Store quiz results
- `GET /api/analytics` - Get performance analytics
- `GET /api/export` - Export results data

## License

This project is licensed under the MIT License.

## Support

For support and questions, please refer to the documentation or create an issue in the repository.
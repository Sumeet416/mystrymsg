import { fr } from "zod/locales";
import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Container,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Container
        style={{
          margin: '0 auto',
          padding: '20px 0 48px',
          maxWidth: '560px',
        }}
      >
        <Section
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #f0f0f0',
            borderRadius: '8px',
            padding: '32px',
          }}
        >
          <Row>
            <Heading 
              as="h2"
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#333333',
                marginBottom: '16px',
              }}
            >
              Hello {username},
            </Heading>
          </Row>
          <Row>
            <Text
              style={{
                fontSize: '16px',
                lineHeight: '24px',
                color: '#555555',
                marginBottom: '24px',
              }}
            >
              Thank you for registering. Please use the following verification
              code to complete your registration:
            </Text>
          </Row>
          <Row>
            <Text
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#2563eb',
                textAlign: 'center' as const,
                backgroundColor: '#f8fafc',
                padding: '16px 24px',
                borderRadius: '8px',
                border: '2px dashed #e2e8f0',
                letterSpacing: '4px',
                fontFamily: 'monospace',
                marginBottom: '24px',
              }}
            >
              {otp}
            </Text>
          </Row>
          <Row>
            <Text
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: '#666666',
                marginBottom: '16px',
              }}
            >
              This code will expire in 10 minutes for security purposes.
            </Text>
          </Row>
          <Row>
            <Text
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: '#666666',
              }}
            >
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
          {/* Alternative verification button - uncomment if needed */}
          {/* <Row style={{ marginTop: '24px' }}>
            <Button
              href={`http://localhost:3000/verify/${username}`}
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'inline-block',
              }}
            >
              Verify Account
            </Button>
          </Row> */}
        </Section>
        <Section style={{ marginTop: '16px' }}>
          <Text
            style={{
              fontSize: '12px',
              lineHeight: '16px',
              color: '#888888',
              textAlign: 'center' as const,
            }}
          >
            This email was sent to verify your account registration.
          </Text>
        </Section>
      </Container>
    </Html>
  );
} 
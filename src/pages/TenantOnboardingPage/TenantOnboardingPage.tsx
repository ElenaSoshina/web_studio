import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createTenant, saveTenantContextId, type CreateTenantRequest } from '../../services/tenantApi';
import { useTenantBranding } from '../../context/TenantBrandingContext';
import styles from './TenantOnboardingPage.module.css';

interface FormState {
  name: string;
  ownerEmail: string;
  ownerPassword: string;
  customDomain: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  ownerEmail: '',
  ownerPassword: '',
  customDomain: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,32}$/;

const TenantOnboardingPage: React.FC = () => {
  const { t } = useTranslation('tenant');
  const { reloadBranding } = useTenantBranding();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<string[]>([]);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isFormDisabled = useMemo(() => isSubmitting || isSuccess, [isSubmitting, isSuccess]);

  const validate = (): string[] => {
    const nextErrors: string[] = [];

    if (!form.name.trim()) nextErrors.push(t('page.errors.nameRequired'));
    if (!form.ownerEmail.trim()) {
      nextErrors.push(t('page.errors.ownerEmailRequired'));
    } else if (!EMAIL_PATTERN.test(form.ownerEmail.trim())) {
      nextErrors.push(t('page.errors.ownerEmailInvalid'));
    }

    if (!form.ownerPassword.trim()) {
      nextErrors.push(t('page.errors.ownerPasswordRequired'));
    } else if (!PASSWORD_PATTERN.test(form.ownerPassword.trim())) {
      nextErrors.push(t('page.errors.ownerPasswordInvalid'));
    }

    return nextErrors;
  };

  const handleChange =
    (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    setServerMessage(null);

    if (nextErrors.length > 0) {
      return;
    }

    const payload: CreateTenantRequest = {
      name: form.name.trim(),
      ownerEmail: form.ownerEmail.trim(),
      ownerPassword: form.ownerPassword,
      customDomain: form.customDomain.trim() || null,
    };

    setIsSubmitting(true);

    try {
      const result = await createTenant(payload);

      if (result.kind === 'success') {
        const tenantId = result.payload.data?.id;

        if (tenantId) {
          saveTenantContextId(tenantId);
          await reloadBranding();
        }

        setIsSuccess(true);
        setServerMessage(t('page.server.success'));
        return;
      }

      if (result.kind === 'conflict') {
        setServerMessage(t('page.server.conflict'));
        return;
      }

      console.error('Unexpected create tenant response kind', result);
      setServerMessage(t('page.server.genericError'));
    } catch (error) {
      console.error('Unexpected create tenant error', error);
      setServerMessage(t('page.server.genericError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.badge}>{t('page.badge')}</p>
          <h1>{t('page.title')}</h1>
          <p>{t('page.subtitle')}</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            {t('page.fields.name')} *
            <input value={form.name} onChange={handleChange('name')} disabled={isFormDisabled} />
          </label>

          <label>
            {t('page.fields.ownerEmail')} *
            <input
              type="email"
              value={form.ownerEmail}
              onChange={handleChange('ownerEmail')}
              disabled={isFormDisabled}
            />
          </label>

          <label>
            {t('page.fields.ownerPassword')} *
            <input
              type="password"
              value={form.ownerPassword}
              onChange={handleChange('ownerPassword')}
              disabled={isFormDisabled}
            />
          </label>

          <label>
            {t('page.fields.customDomain')} *
            <input value={form.customDomain} onChange={handleChange('customDomain')} disabled={isFormDisabled} />
          </label>

          {errors.length > 0 && (
            <div className={styles.errorBlock}>
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}

          {serverMessage && (
            <div className={isSuccess ? styles.successBlock : styles.errorBlock}>
              <p>{serverMessage}</p>
            </div>
          )}

          <button type="submit" className={styles.submit} disabled={isFormDisabled}>
            {isSubmitting ? t('page.buttons.submitting') : isSuccess ? t('page.buttons.success') : t('page.buttons.submit')}
          </button>
        </form>

        <div className={styles.actions}>
          <Link to="/" className={styles.backLink}>
            {t('page.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TenantOnboardingPage;

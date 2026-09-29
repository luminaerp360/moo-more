import React, { useState, useEffect, useCallback } from 'react';
import {
  Save,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  Share2,
  ExternalLink,
  MessageCircle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { StoreSettings, GeneralStoreSettings, SocialStoreSettings } from '../../types';
import { settingsApi } from '../../services/cms';
import { useSiteContent } from '../../context/ContentContext';
import {
  Spinner,
  PageHeader,
  Card,
  PrimaryButton,
  OutlineButton,
  Field,
  TextInput,
  TextArea,
  ImageUploader,
  Toast,
} from '../../components/admin/AdminUI';

export const SettingsManager: React.FC = () => {
  const { refetchContent, refreshContent } = useSiteContent();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [general, setGeneral] = useState<GeneralStoreSettings>({
    name: 'Moo-More Dairy Farm',
    tagline: 'Fresh & Pure Dairy Farm Products in Eldoret, Kenya',
    phone: '+254 700 000 000',
    email: 'info@moomoredairy.co.ke',
    address: 'Eldoret - Nakuru Highway, Uasin Gishu County, Kenya',
    operatingHours: 'Monday - Saturday: 7:00 AM - 6:00 PM (Sunday: 8:00 AM - 1:00 PM)',
    currency: 'KES',
  });

  const [social, setSocial] = useState<SocialStoreSettings>({
    whatsapp: '+254 700 000 000',
    facebook: 'https://facebook.com/moomoredairy',
    instagram: 'https://instagram.com/moomoredairy',
    twitter: 'https://twitter.com/moomoredairy',
  });

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(null), 3000);
  };

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const data: StoreSettings = await settingsApi.get();
      if (data) {
        const g = data.general || data.generalSettings;
        const s = data.social || data.socialSettings;
        if (g) {
          setGeneral((prev) => ({
            ...prev,
            ...g,
            name: g.storeName || g.name || prev.name,
            tagline: g.storeTagline || g.tagline || prev.tagline,
            phone: g.supportPhone || g.phone || prev.phone,
            email: g.supportEmail || g.email || prev.email,
            address: g.storeAddress || g.address || prev.address,
            logo: g.logoUrl || g.logo || prev.logo,
            operatingHours: g.operatingHours || prev.operatingHours,
            currency: g.currency || prev.currency,
          }));
        }
        if (s) {
          setSocial((prev) => ({
            ...prev,
            ...s,
            whatsapp: s.whatsapp || prev.whatsapp,
            facebook: s.facebook || prev.facebook,
            instagram: s.instagram || prev.instagram,
            twitter: s.twitter || prev.twitter,
          }));
        }
      }
    } catch (err) {
      console.error('Failed to load store settings:', err);
      notify('Could not load current settings', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      await settingsApi.update({
        general: {
          storeName: general.name,
          storeTagline: general.tagline,
          supportPhone: general.phone,
          supportEmail: general.email,
          storeAddress: general.address,
          logoUrl: general.logo,
          currency: general.currency || 'KES',
        },
        social: {
          whatsapp: social.whatsapp,
          facebook: social.facebook,
          instagram: social.instagram,
          twitter: social.twitter,
        },
        generalSettings: general,
        socialSettings: social,
      });
      notify('Farm settings saved successfully!');
      // Refresh global site content context so changes reflect immediately across the app
      if (typeof refetchContent === 'function') {
        await refetchContent();
      } else if (typeof refreshContent === 'function') {
        await refreshContent();
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
      notify('Failed to save settings. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const updateGeneral = (field: keyof GeneralStoreSettings, val: any) => {
    const value = typeof val === 'object' && val !== null && 'target' in val ? val.target.value : val;
    setGeneral((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocial = (field: keyof SocialStoreSettings, val: any) => {
    const value = typeof val === 'object' && val !== null && 'target' in val ? val.target.value : val;
    setSocial((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader
        title="Farm & Website Settings"
        description="Configure your farm contact numbers, WhatsApp, physical address, business hours, and social media links displayed across the website."
        action={
          <div className="flex items-center gap-2">
            <OutlineButton onClick={loadSettings} disabled={isLoading || isSaving} className="gap-2">
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Reload
            </OutlineButton>
            <PrimaryButton onClick={handleSave} disabled={isSaving || isLoading} className="gap-2">
              {isSaving ? <Spinner size="sm" /> : <Save className="w-4 h-4" />}
              Save All Settings
            </PrimaryButton>
          </div>
        }
      />

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Brand Identity Card */}
          <Card className="p-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-stone-200 mb-5">
              <div className="p-2 rounded-lg bg-emerald-50 text-[#15803D]">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F3020]">Farm & Brand Identity</h3>
                <p className="text-xs text-stone-500">Farm branding and headlines shown on the website</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Farm / Business Name" required>
                <TextInput
                  value={general.name || ''}
                  onChange={(e) => updateGeneral('name', e.target.value)}
                  placeholder="e.g. Moo-More Dairy Farm"
                />
              </Field>

              <Field label="Default Currency">
                <TextInput
                  value={general.currency || 'KES'}
                  onChange={(e) => updateGeneral('currency', e.target.value)}
                  placeholder="e.g. KES"
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Farm Tagline / Catchphrase">
                  <TextInput
                    value={general.tagline || ''}
                    onChange={(e) => updateGeneral('tagline', e.target.value)}
                    placeholder="e.g. Fresh & Pure Dairy Farm Products in Eldoret, Kenya"
                  />
                </Field>
              </div>

              <div className="md:col-span-2">
                <ImageUploader
                  label="Farm Logo or Brand Image"
                  value={general.logo || ''}
                  onChange={(url) => updateGeneral('logo', url)}
                  placeholder="https://..."
                />
              </div>
            </div>
          </Card>

          {/* Contact Details Card */}
          <Card className="p-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-stone-200 mb-5">
              <div className="p-2 rounded-lg bg-emerald-50 text-[#15803D]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F3020]">Official Contact Information</h3>
                <p className="text-xs text-stone-500">Contact details shown in headers, footers, and the contact page</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Primary Phone Number" required>
                <div className="relative">
                  <TextInput
                    value={general.phone || ''}
                    onChange={(e) => updateGeneral('phone', e.target.value)}
                    placeholder="+254 700 000 000"
                  />
                </div>
              </Field>

              <Field label="Official Support Email" required>
                <div className="relative">
                  <TextInput
                    value={general.email || ''}
                    onChange={(e) => updateGeneral('email', e.target.value)}
                    placeholder="info@moomoredairy.co.ke"
                  />
                </div>
              </Field>

              <div className="md:col-span-2">
                <Field label="Physical Farm Address" required>
                  <TextInput
                    value={general.address || ''}
                    onChange={(e) => updateGeneral('address', e.target.value)}
                    placeholder="e.g. Eldoret - Nakuru Highway, Uasin Gishu County, Kenya"
                  />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="Operating / Visiting Hours">
                  <TextArea
                    value={general.operatingHours || ''}
                    onChange={(e) => updateGeneral('operatingHours', e.target.value)}
                    rows={2}
                    placeholder="e.g. Monday - Saturday: 7:00 AM - 6:00 PM (Sunday: 8:00 AM - 1:00 PM)"
                  />
                </Field>
              </div>
            </div>
          </Card>

          {/* WhatsApp & Social Media Card */}
          <Card className="p-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-stone-200 mb-5">
              <div className="p-2 rounded-lg bg-emerald-50 text-[#15803D]">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F3020]">WhatsApp & Social Media Links</h3>
                <p className="text-xs text-stone-500">Channels used for direct customer chat and social engagement</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Direct WhatsApp Number or Link" required>
                <div className="space-y-1">
                  <TextInput
                    value={social.whatsapp || ''}
                    onChange={(e) => updateSocial('whatsapp', e.target.value)}
                    placeholder="+254 700 000 000 or 254700000000"
                  />
                  <p className="text-[11px] text-stone-400">
                    Visitors clicking the WhatsApp button on your website will start a chat with this number.
                  </p>
                </div>
              </Field>

              <Field label="Facebook Page URL">
                <TextInput
                  value={social.facebook || ''}
                  onChange={(e) => updateSocial('facebook', e.target.value)}
                  placeholder="https://facebook.com/moomoredairy"
                />
              </Field>

              <Field label="Instagram Profile URL">
                <TextInput
                  value={social.instagram || ''}
                  onChange={(e) => updateSocial('instagram', e.target.value)}
                  placeholder="https://instagram.com/moomoredairy"
                />
              </Field>

              <Field label="Twitter / X Profile URL">
                <TextInput
                  value={social.twitter || ''}
                  onChange={(e) => updateSocial('twitter', e.target.value)}
                  placeholder="https://twitter.com/moomoredairy"
                />
              </Field>
            </div>
          </Card>

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
            <PrimaryButton type="submit" disabled={isSaving} className="gap-2 px-6 py-2.5 text-sm">
              {isSaving ? <Spinner size="sm" /> : <Save className="w-4 h-4" />}
              Save All Changes
            </PrimaryButton>
          </div>
        </form>
      )}

      {toast && <Toast message={toast} type={toastType} />}
    </div>
  );
};

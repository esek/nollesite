import Btn from '@/components/forms/btn';
import Input from '@/components/forms/input';
import Heading from '@/components/typography/heading';
import { useLocale } from '@/hooks/locale.hook';
import { Content } from '@/models/content';
import React, { FormEvent, useState } from 'react';
import { FiLoader, FiSend } from 'react-icons/fi';

const Contact: React.FC<Content<'content.contact'>> = ({ email, title }) => {
  const { t } = useLocale();

  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState(t('contact.send'));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Change the button text to indicate that the form is sending
    setButtonText(t('contact.sending'));

    try {
      // Send the email to the server
      const res = await fetch('/api/email', {
        method: 'POST',
        body: JSON.stringify({
          to: email,
          from,
          message,
          email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      // If successful, reset the form
      setButtonText(t('contact.sent'));
      setFrom('');
      setMessage('');
    } catch {
      // If there was an error, udpate the buttontext
      setButtonText(t('contact.error'));
    } finally {
      // Reset the loading state
      setIsLoading(false);

      // Reset the button text to the default after 2 seconds
      setTimeout(() => {
        setButtonText(t('contact.send'));
      }, 2000);
    }
  };

  return (
    <>
      {title && <Heading id="contact">{title}</Heading>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          name="from"
          placeholder="Hacke Hackspett"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          label={t('contact.from')}
          helper={t('contact.from-helper')}
        />

        <Input
          name="message"
          type="multiline"
          placeholder={t('contact.message-placeholder')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label={t('contact.message')}
        />

        <Btn
          type="submit"
          className="flex w-fit items-center gap-2 self-center !px-8 !py-4"
        >
          {/* When sending, we want to show a spinner */}
          {isLoading ? <FiLoader className="animate-spin" /> : <FiSend />}
          {buttonText}
        </Btn>
      </form>
    </>
  );
};

export default Contact;

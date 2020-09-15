import useGoogleSheets from 'use-google-sheets';
import styles from '../../styles/CarView.module.css';

type Totals = {
  paid: string;
  initialAmount: string;
  remaining: string;
};

type Payment = {
  amount: string;
  date: string;
};

export default function CarView() {
  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    sheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID,
    sheetsNames: ['payments', 'totals'],
  });

  console.log({ data, loading, error });

  let paidAmount;
  let lastPayment;
  let initialAmount;
  let remainingAmount;

  if (data.length) {
    const totals = (data[1].data[0] as unknown) as Totals;
    paidAmount = totals.paid;
    initialAmount = totals.initialAmount;
    remainingAmount = totals.remaining;
    lastPayment = data[0].data[data[0].data.length - 1];
  }

  return (
    <div>
      <img
        src="/xbfront.webp"
        width="500"
        height="256"
        className={styles.scion}
      />
      <div className={styles.card}>
        {loading && <p>loading</p>}
        {data.length && (
          <p>
            So far you've paid{' '}
            <span className={styles.emphasis}>${paidAmount}</span> of{' '}
            <span className={styles.emphasis}>${initialAmount}</span>, which
            leaves <span className={styles.emphasis}>${remainingAmount}</span>.
            Your last payment was{' '}
            <span className={styles.emphasis}>${lastPayment.amount}</span> on{' '}
            <span className={styles.emphasis}>{lastPayment.date}</span>.
          </p>
        )}
      </div>
    </div>
  );
}

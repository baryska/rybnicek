import formStyles from "./forestSubmitForm.module.css";

const ForestSubmitForm = () => {
  return (
    <div className={formStyles.formSection}>
      <h2 className={formStyles.formTitle}>Napište nám</h2>

    

      <p className={formStyles.formDescription}>
        Pošlete nám vyluštěnou tajenku, zprávu nebo fotku e-mailem:
      </p>

      <div className={formStyles.contactSection}>
        
        <p className={formStyles.contactItem}>
          <a href="mailto:spolekvinice@email.cz" className={formStyles.contactLink}>
            spolekvinice@email.cz
          </a>
        </p>
        <p className={formStyles.contactItem}>
          <a
            href="https://www.facebook.com/profile.php?id=61585544017185"
            target="_blank"
            rel="noopener noreferrer"
            className={formStyles.contactLink}
          >
            Spolek Vinice Beroun na Facebooku
          </a>
        </p>
      </div>
        <p className={formStyles.formDescription}>
        Jestli nám chcete něco vzkázat, budeme moc rádi za zpětnou vazbu pro
        naši další práci pro děti. Stejně tak nám můžete poslat fotku lesního
        domečku, který jste postavili.
      </p>
    </div>
  );
};

export default ForestSubmitForm;

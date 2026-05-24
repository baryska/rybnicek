"use client";
import { useState, useRef } from "react";
import styles from "./forestMap.module.css";
import formStyles from "./forestSubmitForm.module.css";

const ForestSubmitForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [solution, setSolution] = useState("");
  const [comment, setComment] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState("");
  const [hearAboutUsOther, setHearAboutUsOther] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!email) {
      alert("Vyplnte prosím svůj e-mail.");
      return;
    }
    if (!solution) {
      alert("Vyplňte prosím tajenku.");
      return;
    }

    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("message", `Lesní hra z Vinice - Tajenka: ${solution}`);
      formData.append("comment", comment);
      formData.append("teamSize", teamSize);
      formData.append(
        "hearAboutUs",
        hearAboutUs === "Jinde" ? `Jinde - ${hearAboutUsOther}` : hearAboutUs
      );
      if (image) {
        formData.append("attachment", image);
      }

      const response = await fetch("https://formspree.io/f/mnnvygak", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("sent");
        setFirstName("");
        setLastName("");
        setEmail("");
        setSolution("");
        setComment("");
        setTeamSize("");
        setHearAboutUs("");
        setHearAboutUsOther("");
        setImage(null);
        setImagePreview(null);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={formStyles.formSection}>
      <h2 className={formStyles.formTitle}>Odeslat tajenku</h2>

      <p className={formStyles.formDescription}>
        Jestli nám chcete něco vzkázat, budeme moc rádi za zpětnou vazbu pro
        naši další práci pro děti. Stejně tak nám můžete poslat fotku lesního
        domečku, který jste postavili.
      </p>

      <div className={formStyles.formGrid}>
        <input
          type="text"
          placeholder="Tajenku zapište sem"
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          className={formStyles.input}
        />
        <input
          type="text"
          placeholder="Jméno"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={formStyles.input}
        />
        <input
          type="text"
          placeholder="Příjmení"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={formStyles.input}
        />
        <input
          type="email"
          placeholder="Váš e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={formStyles.input}
        />
        <input
          type="number"
          placeholder="Kolik vás luštilo?"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          className={formStyles.input}
        />
        <select
          value={hearAboutUs}
          onChange={(e) => setHearAboutUs(e.target.value)}
          className={`${formStyles.input} ${hearAboutUs === "" ? formStyles.selectPlaceholder : ""}`}
        >
          <option value="" disabled>
            Kde jste se o hře dozvěděli?
          </option>
          <option value="Na Instagramu/Facebooku">Na Instagramu/Facebooku</option>
          <option value="Na plakátech ve městě">Na plakátech ve městě</option>
          <option value="Od kamarádů/známých">Od kamarádů/známých</option>
          <option value="Jinde">Jinde</option>
        </select>
        {hearAboutUs === "Jinde" && (
          <input
            type="text"
            placeholder="Kde?"
            value={hearAboutUsOther}
            onChange={(e) => setHearAboutUsOther(e.target.value)}
            className={formStyles.input}
          />
        )}
        <textarea
          placeholder="Chcete nám něco vzkázat?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={formStyles.textarea}
          rows={3}
        />
      </div>

      <div className={formStyles.imageSection}>
        <p className={formStyles.imageLabel}>
          Postavili jste lesní domeček? Pošlete nám fotku!
        </p>
        <label className={formStyles.imageUploadButton}>
          Vybrat obrázek
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </label>
        {imagePreview && (
          <div className={formStyles.imagePreviewContainer}>
            <img src={imagePreview} alt="Náhled" className={formStyles.imagePreview} />
            <button onClick={removeImage} className={formStyles.imageRemoveButton}>
              Odebrat
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={status === "sending"}
        className={formStyles.submitButton}
      >
        {status === "sending" ? "Odesílám..." : "Odeslat"}
      </button>

      {status === "sent" && (
        <p className={formStyles.statusSuccess}>Odesláno! Děkujeme za zpětnou vazbu.</p>
      )}
      {status === "error" && (
        <p className={formStyles.statusError}>Chyba při odesílání. Zkuste to prosím znovu.</p>
      )}

      <div className={formStyles.contactSection}>
        <p className={formStyles.contactText}>
          Nebo nám napište přímo:
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
        <p className={formStyles.contactItem}>
          <a href="mailto:spolekvinice@email.cz" className={formStyles.contactLink}>
            spolekvinice@email.cz
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForestSubmitForm;

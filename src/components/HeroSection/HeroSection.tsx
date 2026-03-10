import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./HeroSection.module.css";

const HeroSection: React.FC = () => {
  const { t } = useTranslation("hero");

  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    satisfaction: 0,
    supportHours: 0,
    clients: 0,
  });

  const [isCardVisible, setIsCardVisible] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Анимация цифр в статистике
  useEffect(() => {
    const animateNumbers = () => {
      const duration = 1500; // 1.5 секунды
      const steps = 60;
      const stepDuration = duration / steps;

      const finalValues = {
        projects: 50,
        satisfaction: 100,
        supportHours: 24,
        clients: 120,
      };

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setAnimatedStats({
          projects: Math.floor(finalValues.projects * progress),
          satisfaction: parseFloat(
            (finalValues.satisfaction * progress).toFixed(1),
          ),
          supportHours: Math.floor(finalValues.supportHours * progress),
          clients: Math.floor(finalValues.clients * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedStats(finalValues);
        }
      }, stepDuration);
    };

    // Запускаем анимацию через задержку
    const timeout = setTimeout(animateNumbers, 300);
    return () => clearTimeout(timeout);
  }, []);

  // Анимация появления карточек
  useEffect(() => {
    // Убираем задержку - карточки будут появляться сразу с индивидуальными задержками из CSS
    setIsCardVisible(true);
  }, []);

  return (
    <section className={styles.heroSection} id="home">
      {/* Футуристический анимированный фон */}
      <div className={styles.futuristicBackground}>
        <div className={styles.gridPattern}></div>

        {/* Добавляем печатающийся код на фон */}
        <div className={styles.typingCodeBackground}>
          <div className={`${styles.codeSnippet} ${styles.snippet1}`}>
            <span
              className={styles.typingText}
              data-text="@RestController"
            ></span>
          </div>
          <div className={`${styles.codeSnippet} ${styles.snippet2}`}>
            <span
              className={styles.typingText}
              data-text="public class WebAp.dev {"
            ></span>
          </div>
          <div className={`${styles.codeSnippet} ${styles.snippet3}`}>
            <span
              className={styles.typingText}
              data-text="@Autowired TelegramBot bot;"
            ></span>
          </div>
          <div className={`${styles.codeSnippet} ${styles.snippet4}`}>
            <span
              className={styles.typingText}
              data-text="return ResponseEntity.ok();"
            ></span>
          </div>
          <div className={`${styles.codeSnippet} ${styles.snippet5}`}>
            <span
              className={styles.typingText}
              data-text={t("codeComments.createFuture")}
            ></span>
          </div>
          <div className={`${styles.codeSnippet} ${styles.snippet6}`}>
            <span
              className={styles.typingText}
              data-text='@PostMapping("/api/webapp")'
            ></span>
          </div>
        </div>

        <div className={styles.glowingOrbs}>
          <div className={`${styles.orb} ${styles.orb1}`}></div>
          <div className={`${styles.orb} ${styles.orb2}`}></div>
          <div className={`${styles.orb} ${styles.orb3}`}></div>
        </div>
        <div className={styles.floatingElements}>
          <div className={`${styles.element} ${styles.element1}`}></div>
          <div className={`${styles.element} ${styles.element2}`}></div>
          <div className={`${styles.element} ${styles.element3}`}></div>
        </div>
        <div className={styles.scanLines}></div>
      </div>

      {/* Основной контент */}
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          {/* <div className={styles.tagline}>
            <span className={styles.bracket}>{'<'}</span>
            <span className={styles.tagText}>{t('tagline')}</span>
            <span className={styles.bracket}>{'/>'}</span>
          </div> */}

          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine1}>{t("title.line1")}</span>
            <span className={styles.titleLine2}>
              <span className={styles.neonText}>{t("title.line2")}</span>
            </span>
            <span className={styles.titleLine3}>{t("title.line3")}</span>
          </h1>

          <p className={styles.heroSubtitle}>{t("subtitle")}</p>

          <div className={styles.heroButtons}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => scrollToSection("contacts")}
            >
              <span className={styles.btnText}>
                {t("buttons.orderProject")}
              </span>
              <div className={styles.btnGlow}></div>
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => scrollToSection("portfolio")}
            >
              <span className={styles.btnText}>{t("buttons.portfolio")}</span>
              <div className={styles.btnScanline}></div>
            </button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.animatedCards}>
            <div
              className={`${styles.statCard} ${isCardVisible ? styles.cardVisible : ""}`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className={styles.cardIcon}>🚀</div>
              <div className={styles.cardValue}>
                <span className={styles.cardNumber}>
                  {animatedStats.projects}
                </span>
                <span className={styles.cardPlus}>+</span>
              </div>
              <div className={styles.cardLabel}>
                {t("stats.projects.label")}
              </div>
              <div className={styles.cardTrend}>
                <span className={styles.trendUp}>
                  {t("stats.projects.trend")}
                </span>
              </div>
            </div>

            <div
              className={`${styles.statCard} ${isCardVisible ? styles.cardVisible : ""}`}
              style={{ animationDelay: "0.5s" }}
            >
              <div className={styles.cardIcon}>😊</div>
              <div className={styles.cardValue}>
                <span className={styles.cardNumber}>
                  {animatedStats.satisfaction}
                </span>
                <span className={styles.cardPercent}>%</span>
              </div>
              <div className={styles.cardLabel}>
                {t("stats.satisfaction.label")}
              </div>
            </div>

            <div
              className={`${styles.statCard} ${isCardVisible ? styles.cardVisible : ""}`}
              style={{ animationDelay: "0.7s" }}
            >
              <div className={styles.cardIcon}>👥</div>
              <div className={styles.cardValue}>
                <span className={styles.cardNumber}>
                  {animatedStats.supportHours}
                </span>
                <span className={styles.cardUnit}>h</span>
              </div>
              <div className={styles.cardLabel}>{t("stats.support.label")}</div>
            </div>

            <div
              className={`${styles.statCard} ${isCardVisible ? styles.cardVisible : ""}`}
              style={{ animationDelay: "0.9s" }}
            >
              <div className={styles.cardIcon}>💼</div>
              <div className={styles.cardValue}>
                <span className={styles.cardNumber}>
                  {animatedStats.clients}
                </span>
                <span className={styles.cardPlus}>+</span>
              </div>
              <div className={styles.cardLabel}>{t("stats.clients.label")}</div>
              <div className={styles.cardTrend}>
                <span className={styles.trendUp}>
                  {t("stats.clients.trend")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

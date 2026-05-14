import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { HOME_GALLERY_IMAGES } from '../data/homeGallery'
import './HomeLanding.css'

function MarqueeRow({
  images,
  reverse,
  durationSec,
}: {
  images: string[]
  reverse?: boolean
  durationSec: number
}) {
  const loop = [...images, ...images]
  return (
    <div className="landMarqueeWrap">
      <div
        className={`landMarqueeInner${reverse ? ' landMarqueeInner--reverse' : ''}`}
        style={{ ['--marquee-dur' as string]: `${durationSec}s` }}
      >
        {loop.map((src, i) => (
          <figure key={`${src}-${i}`} className="landMarqueeFig">
            <img src={src} alt="" loading="lazy" decoding="async" draggable={false} />
          </figure>
        ))}
      </div>
    </div>
  )
}

const TXT_LOOP =
  'Menos aterro · Mais vizinhança · Telha que sobra vira teto · Madeira vira móvel · Economia circular de verdade · Menos caminhão de entulho · Mais grana no bolso · Obra inteligente · Planeta agradece · '

function TextMarquee() {
  const doubled = TXT_LOOP + TXT_LOOP
  return (
    <div className="landTxtMarqueeWrap" aria-hidden>
      <div className="landTxtMarqueeTrack">
        <span className="landTxtMarqueeText">{doubled}</span>
        <span className="landTxtMarqueeText">{doubled}</span>
      </div>
    </div>
  )
}

function ParallaxBand({
  image,
  eyebrow,
  title,
  children,
}: {
  image: string
  eyebrow: string
  title: string
  children: ReactNode
}) {
  const ref = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion() === true
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })
  const yImg = useTransform(spring, [0, 1], reduceMotion ? [0, 0] : [72, -72])
  const imgScale = useTransform(spring, [0, 0.45, 1], reduceMotion ? [1, 1, 1] : [1.06, 1.14, 1.05])
  const imgOpacity = useTransform(
    spring,
    [0, 0.35, 0.65, 1],
    reduceMotion ? [0.34, 0.34, 0.34, 0.34] : [0.22, 0.42, 0.42, 0.2],
  )
  const panelY = useTransform(spring, [0, 1], reduceMotion ? [0, 0] : [28, -18])

  return (
    <section ref={ref} className="landParallaxBand">
      <motion.div className="landParallaxBand__bg" style={{ y: yImg, scale: imgScale, opacity: imgOpacity }}>
        <img src={image} alt="" decoding="async" draggable={false} />
        <div className="landParallaxBand__bgVeil" />
      </motion.div>
      <motion.div className="landParallaxBand__panel" style={{ y: panelY }}>
        <p className="landParallaxBand__eyebrow">{eyebrow}</p>
        <h2 className="landParallaxBand__title">{title}</h2>
        <div className="landParallaxBand__body">{children}</div>
      </motion.div>
    </section>
  )
}

function GlassCard({
  image,
  tag,
  title,
  children,
  delay = 0,
}: {
  image: string
  tag: string
  title: string
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.article
      className="landGlassCard"
      initial={false}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 420, damping: 22 } }}
      animate={{
        y: [0, -5, 0],
        rotateZ: [0, 0.25, 0, -0.2, 0],
      }}
      transition={{
        duration: 9 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <div className="landGlassCard__media" aria-hidden>
        <img src={image} alt="" loading="lazy" decoding="async" draggable={false} />
        <div className="landGlassCard__scrim" />
      </div>
      <div className="landGlassCard__glass">
        <span className="landGlassCard__tag">{tag}</span>
        <h3 className="landGlassCard__title">{title}</h3>
        <div className="landGlassCard__copy">{children}</div>
      </div>
    </motion.article>
  )
}

function AuroraField() {
  const reduceMotion = useReducedMotion() === true
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const spring = useSpring(scrollYProgress, { stiffness: 70, damping: 32 })
  const x = useTransform(spring, [0, 1], reduceMotion ? [50, 50] : [18, 82])
  const y = useTransform(spring, [0, 1], reduceMotion ? [50, 50] : [72, 28])
  const x2 = useTransform(spring, [0, 1], reduceMotion ? [50, 50] : [82, 18])
  const y2 = useTransform(spring, [0, 1], reduceMotion ? [50, 50] : [20, 80])
  const bg = useMotionTemplate`radial-gradient(900px circle at ${x}% ${y}%, rgba(74,222,128,0.35), transparent 42%),
    radial-gradient(700px circle at ${x2}% ${y2}%, rgba(56,189,248,0.28), transparent 45%)`

  return (
    <div ref={ref} className="landAuroraSection">
      <motion.div className="landAuroraField" style={{ background: bg }} aria-hidden />
      <div className="landAuroraInner">
        <motion.h2
          className="landAuroraTitle"
          animate={reduceMotion ? {} : { letterSpacing: ['-0.03em', '-0.01em', '-0.03em'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          Motion que não dorme.
          <br />
          <span className="landAuroraTitleGrad">Conteúdo que respira.</span>
        </motion.h2>
        <p className="landAuroraLead">
          Aqui a ideia é simples: você sente que a página está viva o tempo inteiro — gradientes viajando com o scroll, fotos meio fantasmas por baixo do texto,
          vidro fosco em cima de obra, e micro‑movimentos que ninguém pediu mas todo mundo nota. É de propósito: projeto de ciências com cara de produto de 2026.
        </p>
        <ul className="landAuroraList">
          <li>
            <strong>Camadas</strong> — imagem desfocada + ruído + brilho + tipografia nítida. Profundidade sem usar 3D pesado.
          </li>
          <li>
            <strong>Scroll como diretor</strong> — parallax com mola (spring): não é “tremedeira de slide”, é fluidez.
          </li>
          <li>
            <strong>Loops honestos</strong> — marquees e texturas contínuas, pra sensação de produto rodando 24/7, não de site estático.
          </li>
        </ul>
      </div>
    </div>
  )
}

export function HomePage() {
  const imgs = HOME_GALLERY_IMAGES
  const even = imgs.filter((_, i) => i % 2 === 0)
  const odd = imgs.filter((_, i) => i % 2 === 1)
  const floatImgs = imgs.slice(0, 6)
  const orbitRing = imgs.slice(6, 12)
  const centerImg = imgs[12] ?? imgs[0]
  const bandImgs = imgs.slice(13, 17)
  const ctaMini = imgs.slice(17, 24)
  const glassA = imgs[0] ?? imgs[0]
  const glassB = imgs[3] ?? imgs[0]
  const glassC = imgs[5] ?? imgs[0]
  const glassD = imgs[8] ?? imgs[0]
  const parallaxImg = imgs[10] ?? imgs[0]
  const quoteBg = imgs[15] ?? imgs[0]

  return (
    <div className="landRoot">
      <TextMarquee />

      <section className="landHero" aria-label="Início">
        <div className="landHeroMesh" aria-hidden />
        <div className="landHeroNoise" aria-hidden />
        <div className="landOrb landOrb--a" aria-hidden />
        <div className="landOrb landOrb--b" aria-hidden />
        <div className="landOrb landOrb--c" aria-hidden />
        <div className="landRing" aria-hidden />
        <div className="landRing landRing--2" aria-hidden />

        <div className="landHeroFloatImgs" aria-hidden>
          {floatImgs.map((src, i) => (
            <div key={src + i} className="landFloatCard" style={{ animationDelay: `${-i * 0.7}s` }}>
              <img src={src} alt="" decoding="async" draggable={false} />
            </div>
          ))}
        </div>

        <div className="landHeroContent">
          <motion.div
            className="landBadge"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="landBadgeDot" />
            MVP escolar · economia circular · zero backend
          </motion.div>

          <motion.h1
            className="landHeroTitle landDisplay"
            initial={false}
            animate={{ scale: [1, 1.012, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          >
            Sobrou <span>telha</span>, tijolo, madeira, tinta?
            <br />
            Alguém a <span>duas quadras</span> tá precisando.
          </motion.h1>

          <motion.p
            className="landHeroSub"
            animate={{ opacity: [0.72, 1, 0.72] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            O EntulhoZero é um protótipo que mostra como conectar <strong>sobras de obra</strong> com quem quer reaproveitar: você publica com prazo, recebe interesse no chat e combina retirada.
            Sem “IA mágica” decidindo nada — é <strong>gente falando com gente</strong>, do jeito que funciona no mundo real.
          </motion.p>

          <p className="landHeroMicro">
            Perfeito pra explicar na banca: problema (entulho + desperdício), solução (marketplace local), impacto (menos descarte), limitações honestas (MVP sem pagamento/logística real).
          </p>

          <div className="landHeroCtas">
            <Link className="landBtn landBtn--primary" to="/novo">
              Criar anúncio agora
            </Link>
            <Link className="landBtn landBtn--ghost" to="/explorar">
              Ver materiais disponíveis
            </Link>
          </div>

          <motion.div
            className="landHeroDeck"
            initial={false}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="landHeroDeckCard">
              <span className="landHeroDeckK">Local</span>
              <span className="landHeroDeckV">Bairro + cidade</span>
              <span className="landHeroDeckD">Pra combinar retirada sem novela.</span>
            </div>
            <div className="landHeroDeckCard">
              <span className="landHeroDeckK">Prazo</span>
              <span className="landHeroDeckV">Expira sozinho</span>
              <span className="landHeroDeckD">Anúncio some quando a janela fecha — sem “zumbi”.</span>
            </div>
            <div className="landHeroDeckCard">
              <span className="landHeroDeckK">Chat</span>
              <span className="landHeroDeckV">Negociação direta</span>
              <span className="landHeroDeckD">Pergunta medida, quantidade, estado do material.</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="landMarqueeBlock" aria-hidden>
        <MarqueeRow images={even.length ? even : imgs} durationSec={48} />
        <MarqueeRow images={odd.length ? odd : imgs} reverse durationSec={62} />
        <MarqueeRow images={[...imgs].reverse()} durationSec={70} />
      </div>

      <section className="landEditorial">
        <div className="landEditorialInner">
          <p className="landEditorialEyebrow">Contexto que a banca entende em 20 segundos</p>
          <h2 className="landEditorialH2">Construção gera muito resíduo — e muita coisa ainda dá pra usar.</h2>
          <div className="landEditorialCols">
            <div>
              <p>
                Reformou? Sobrou telha, rodapé, piso, portão, ferro, madeira, tinta meio cheia? Normal. O problema é que isso vira entulho caro, caminhão, aterro — ou fica
                ocupando garagem até virar “arqueologia doméstica”.
              </p>
              <p>
                Do outro lado, alguém no mesmo bairro pode estar precisando exatamente daquela quantidade pra tapar um buraco, fechar um muro, fazer um hack de obra, montar um
                estúdio, uma horta, um rack. Só que hoje isso depende de sorte, grupo de WhatsApp, ou “conheço um cara”.
              </p>
            </div>
            <div>
              <p>
                O EntulhoZero organiza essa troca como <strong>anúncio + prazo + chat</strong>: curto, claro, fácil de demonstrar. Você não promete “salvar o planeta sozinho” — você
                mostra um caminho realista de <strong>desvio de descarte</strong> e <strong>reaproveitamento local</strong>, que é onde a ciência ambiental encontra o comportamento humano.
              </p>
              <p className="landEditorialNote">
                Observação de projeto: pagamento, transporte e validação física do material podem ser “fase 2”. No MVP, a narrativa importa tanto quanto o clique.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="landMosaic" role="presentation">
        {imgs.map((src, i) => (
          <div key={src + i} className="landMosaicCell">
            <img src={src} alt="" loading="lazy" decoding="async" draggable={false} />
          </div>
        ))}
      </div>

      <section className="landGlassSection">
        <div className="landGlassHead">
          <h2>Cartões de vidro em cima de obra — literalmente.</h2>
          <p>
            A estética “2026” é assim: foto meio transparente, blur, contraste alto no texto, e um brilho que nunca fica parado. Abaixo, quatro histórias que você pode ler em voz alta na apresentação.
          </p>
        </div>
        <div className="landGlassGrid">
          <GlassCard
            image={glassA}
            tag="Caso típico"
            title="Sobrou 14 telhas iguais"
            delay={0}
          >
            <p>
              Você descreve quantidade e estado, coloca um prazo curto (“até domingo”), e deixa claro que a retirada é no local. Quem mora perto aparece no chat com pergunta objetiva:
              medida, espessura, marca.
            </p>
          </GlassCard>
          <GlassCard image={glassB} tag="Economia" title="Menos taxa de entulho" delay={0.6}>
            <p>
              Cada saco que não vira entulho é menos peso no bolso e menos rota de caminhão. Mesmo no MVP, dá pra argumentar impacto: <strong>logística reversa de bairro</strong> custa menos energia que descarte centralizado.
            </p>
          </GlassCard>
          <GlassCard image={glassC} tag="Confiança" title="Transparência sem firula" delay={1.2}>
            <p>
              Sem “nota mágica de IA”: quem anuncia escolhe categoria e fala a verdade. Quem compra/pega pergunta no chat. É simples de explicar pra professor: <strong>governança mínima</strong>, regras claras, risco conhecido.
            </p>
          </GlassCard>
          <GlassCard image={glassD} tag="Impacto" title="Ciência + comportamento" delay={1.8}>
            <p>
              O ganho ambiental vem quando reaproveitar é mais fácil que jogar fora. O app não resolve tudo — ele <strong>reduz atrito</strong>. Em ciências, isso vira hipótese: “se o atrito cai, o descarte cai?”
            </p>
          </GlassCard>
        </div>
      </section>

      <ParallaxBand
        image={parallaxImg}
        eyebrow="Camada cinematográfica"
        title="Parallax com mola: a imagem “respira” enquanto você rola."
      >
        <p>
          Esse bloco é de propósito dramático: a foto fica semi‑transparente, se move devagar, e o texto em vidro continua legível. É o tipo de coisa que parece “caro”, mas é só
          composição + física de animação boa (spring), sem vídeo gigante e sem biblioteca 3D.
        </p>
        <p>
          Na sua fala, você pode dizer: <em>“A interface reforça a mensagem — o material ainda está ali, só que agora ele está sendo encaminhado pro reuso.”</em>
        </p>
      </ParallaxBand>

      <section className="landBand">
        <div className="landBandInner">
          <div>
            <h2>Menos entulho, mais vizinhança — com argumento.</h2>
            <p>
              Entulho não é só “lixo feio”: é custo, tempo, ruído, emissão de transporte, pressão em aterro. Reaproveitamento local ataca o problema no lugar onde ele nasce: <strong>perto da obra</strong>.
            </p>
            <p>
              O app mostra uma ponte humana: anunciante → conversa → acordo informal → retirada. É um modelo que dá pra evoluir depois com verificação, reputação e parceiros — mas hoje já dá pra contar a história completa.
            </p>
          </div>
          <div className="landBandGrid">
            {bandImgs.map((src, i) => (
              <div key={src + i} className="landBandShot">
                <img src={src} alt="" loading="lazy" decoding="async" draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <AuroraField />

      <section className="landQuote">
        <div className="landQuote__bg" style={{ backgroundImage: `url("${quoteBg}")` }} aria-hidden />
        <div className="landQuote__veil" aria-hidden />
        <blockquote className="landQuote__box">
          <p>
            “Se a gente faz sobra de obra virar anúncio com prazo, a gente transforma bagunça em mercado. Mercado local é um dos jeitos mais rápidos de mudar hábito — porque é
            conveniente.”
          </p>
          <footer>— pitch que funciona na feira de ciências (e na vida)</footer>
        </blockquote>
      </section>

      <section className="landSteps">
        <div className="landStepsInner">
          <h2>Três passos, zero drama — com texto suficiente pra nota boa.</h2>
          <p className="landStepsLead">
            Você consegue explicar o fluxo em 30 segundos e ainda sobra detalhe pra Q&amp;A: publicação → conversa → retirada. Cada passo abaixo tem “por quê” embutido, pra mostrar que você pensou no usuário e no meio ambiente.
          </p>

          <div className="landOrbit" aria-hidden>
            <div className="landOrbitRing" />
            {orbitRing.map((src, i) => (
              <div key={src + i} className="landOrbitImg" style={{ animationDelay: `${-i * 4}s` }}>
                <img src={src} alt="" decoding="async" draggable={false} />
              </div>
            ))}
            <div className="landOrbitCenter">
              <img src={centerImg} alt="" decoding="async" draggable={false} />
            </div>
          </div>

          <div className="landStepCards">
            <motion.article
              className="landStepCard"
              animate={{ rotate: [0, 0.35, 0, -0.35, 0] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="landStepNum">01</div>
              <h3>Publica com prazo</h3>
              <p>
                Você define material, quantidade, unidade, bairro/cidade e uma janela de tempo. O prazo cria urgência saudável: quem precisa decide rápido, e quem anuncia não fica com post “eterno” no ar.
              </p>
            </motion.article>
            <motion.article
              className="landStepCard"
              animate={{ rotate: [0, -0.35, 0, 0.35, 0] }}
              transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
            >
              <div className="landStepNum">02</div>
              <h3>Chat na hora</h3>
              <p>
                Interessados perguntam de verdade: medidas, compatibilidade, horário de retirada. O chat é simples de demonstrar ao vivo e evita depender de corrente de stories ou grupos gigantes.
              </p>
            </motion.article>
            <motion.article
              className="landStepCard"
              animate={{ rotate: [0, 0.28, 0, -0.28, 0] }}
              transition={{ duration: 10.5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
            >
              <div className="landStepNum">03</div>
              <h3>Reaproveita</h3>
              <p>
                Fechou? Material sai da garagem e entra em outra obra. Você fecha o ciclo narrando impacto: menos descarte, menos custo, mais eficiência urbana — tudo mensurável em “kg desviados” numa versão futura.
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="landCta">
        <div className="landCtaGlow" aria-hidden />
        <motion.h2
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          Fecha com estilo: mostra o app, mostra o fluxo, mostra o impacto.
        </motion.h2>
        <p>
          Na demonstração, faça o caminho completo: cria um anúncio com prazo, abre outro perfil (troca o nome no topo), manda mensagem, mostra inbox. Isso prova interação social + economia circular sem precisar fingir integração bancária.
        </p>
        <div className="landCtaRow">
          <Link className="landBtn landBtn--primary" to="/novo">
            Publicar material agora
          </Link>
          <Link className="landBtn landBtn--ghost" to="/explorar">
            Abrir vitrine de anúncios
          </Link>
        </div>
        <div className="landCtaMini">
          {ctaMini.map((src, i) => (
            <img key={src + i} src={src} alt="" loading="lazy" decoding="async" draggable={false} />
          ))}
        </div>
        <p className="landCtaFoot">
          EntulhoZero · protótipo frontend · dados em memória · feito pra apresentação e pra evoluir depois com PIX, fotos reais, reputação e parceiros de coleta.
        </p>
      </section>
    </div>
  )
}

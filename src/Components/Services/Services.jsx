const code = `async function makeQRCode(text) {
  const url = new URL("https://api.qrserver.com/v1/create-qr-code/");
  url.searchParams.set("data", text);
  url.searchParams.set("size", "300x300");
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.status);
  return URL.createObjectURL(await res.blob());
}`;

// Webdriver.io's TAP reporter output for the QR code generator.
const testRun = `TAP version 13
1..4
ok 1 QR generator renders the input and button
ok 2 QR generator makes a code for a typed link
ok 3 QR generator rejects an empty field
ok 4 QR generator downloads the image as PNG
# pass 4, fail 0, 3.2s`;

function Incident() {
    return (
        <div className="incident" data-ui>
            <p className="incident__title">Login page returns 500 after update</p>
            <dl>
                <div>
                    <dt>Seen in</dt>
                    <dd>Production, since 09:40</dd>
                </div>
                <div>
                    <dt>Similar</dt>
                    <dd>2 past incidents, 1 note</dd>
                </div>
                <div>
                    <dt>Next step</dt>
                    <dd>Roll back config, add test</dd>
                </div>
            </dl>
        </div>
    );
}

const demos = [
    <pre key="code">
        <code>{code}</code>
    </pre>,
    <pre key="test">
        <code>{testRun}</code>
    </pre>,
    <Incident key="incident" />,
];

function Services({ t }) {
    return (
        <section id="services" className="section services">
            <h2 className="services__heading" data-reveal>
                {t.heading}
            </h2>
            {t.items.map((item, i) => (
                <article className="service" key={i}>
                    <div className="service__demo" data-reveal>
                        {demos[i]}
                    </div>
                    <div className="service__text" data-reveal>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                        <p className="soft">{item.second}</p>
                        <p className="service__tools">
                            <span>{t.tools}: </span>
                            {item.tools}
                        </p>
                    </div>
                </article>
            ))}
        </section>
    );
}

export default Services;

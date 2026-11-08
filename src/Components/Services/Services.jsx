// Each way of working is shown with real evidence: the published Sizewise
// baseline, a test from the Sizewise repository, and a figure from SAP support.

// From crates/scanner/tests/scan.rs in joaolucasmm/sizewise.
const sizewiseTest = `#[test]
fn aggregates_sizes_and_counts_per_folder_and_total() {
    let dir = tree(&[
        ("a.bin", 100),
        ("docs/b.txt", 30),
        ("docs/c.txt", 20),
        ("docs/deep/d.txt", 5),
        ("media/e.mp4", 1000),
    ]);
    fs::create_dir(dir.path().join("empty")).unwrap();
    let result = run(dir.path());

    assert_eq!(result.state(), ScanState::Completed);
    assert_eq!(result.total_size(), 1155);
    assert_eq!(result.total_files(), 5);
    assert_eq!(result.total_folders(), 4);
}`;

function Baseline({ data }) {
    return (
        <figure className="baseline">
            <figcaption className="baseline__title">{data.title}</figcaption>
            <dl>
                {data.rows.map(([label, value]) => (
                    <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                    </div>
                ))}
            </dl>
            <p className="baseline__note">{data.note}</p>
        </figure>
    );
}

function Figure({ data }) {
    return (
        <p className="figure">
            <span className="figure__number">{data.figure}</span>
            <span className="figure__label">{data.label}</span>
        </p>
    );
}

function Services({ t }) {
    const demos = [
        <Baseline key="baseline" data={t.demos.baseline} />,
        <pre key="test">
            <code>{sizewiseTest}</code>
        </pre>,
        <Figure key="figure" data={t.demos.support} />,
    ];

    return (
        <section id="services" className="section services" tabIndex={-1}>
            <h2 className="services__heading" data-reveal>
                {t.heading}
            </h2>
            {t.items.map((item, i) => (
                <article className="service" key={i} id={"service-" + i} tabIndex={-1}>
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

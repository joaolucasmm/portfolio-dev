// Each way of working leads with one figure, then a title and one sentence. The
// evidence behind it (the published Sizewise baseline, a test from the Sizewise
// repository, how I work with other teams) opens under "see more".

// The run of a test from crates/scanner/tests/scan.rs in joaolucasmm/sizewise.
const sizewiseRun = [
    ["prompt", "$ cargo test -p scanner"],
    ["line", "test aggregates_sizes_and_counts_per_folder_and_total ... ", "ok"],
    ["prompt", "// 5 files, 4 folders, 1155 bytes"],
];

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

function TestRun() {
    return (
        <pre className="test-run">
            <code>
                {sizewiseRun.map(([kind, text, ok]) => (
                    <span key={text} className={"test-run__" + kind}>
                        {text}
                        {ok && <b>{ok}</b>}
                        {"\n"}
                    </span>
                ))}
            </code>
        </pre>
    );
}

function Services({ t }) {
    const evidence = [<Baseline key="baseline" data={t.demos.baseline} />, <TestRun key="test" />, null];

    return (
        <section id="services" className="section services" tabIndex={-1}>
            <h2 className="services__heading" data-reveal>
                {t.heading}
            </h2>
            <div className="services__grid">
                {t.items.map((item, i) => (
                    <article className="service" key={i} id={"service-" + i} tabIndex={-1} data-reveal>
                        <p className="service__figure">
                            <span className="service__number">
                                {item.figure[0]}
                                {item.figure[1] && <small>{item.figure[1]}</small>}
                            </span>
                            <span className="service__caption">{item.caption}</span>
                        </p>
                        <h3 className="service__title">{item.title}</h3>
                        <p>{item.short}</p>
                        <ul className="service__tools" aria-label={t.tools}>
                            {item.tools.split(", ").map((tool) => (
                                <li key={tool}>{tool}</li>
                            ))}
                        </ul>
                        <details className="service__more">
                            <summary>{item.more}</summary>
                            <div className="service__evidence">
                                {evidence[i]}
                                <p className="soft">{item.second}</p>
                            </div>
                        </details>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Services;

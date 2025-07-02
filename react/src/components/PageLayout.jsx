import LittleBox from "./LittleBox";

const PageLayout = (props) => {
    const { title, featured, sections } = props;
    return (
        <div className="PageLayout">
            <div className="PageLayout-Left">
                <h1>{title}</h1>
                <div>
                    {featured?.map(feature => {
                        return (
                            <p key={feature.title}>{feature.title}: {feature?.value}</p>
                        );
                    })}
                </div>
            </div>
            <div className="PageLayout-Right">
                {sections.map((section) => {
                    return (
                        <div key={section?.title}>
                            <h2>{section?.title}</h2>
                            {section?.value?.map((val, idx) => <LittleBox key = {val?.id} title = {val?.title || val?.name} page={section?.page} id={val?.id} />)}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default PageLayout;
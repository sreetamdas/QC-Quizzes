import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <section className="dark-bg">
                <h1 className="josefinSlab text-center orange" style={{ fontSize: '65px' }}>
					{this.props.heading}
				</h1>
            </section>
        )
    }
}

export default Header;
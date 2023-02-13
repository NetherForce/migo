import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Map = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">map</h1>
          <p className="lead">map</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              map
            </Link>
            <Link to="/login" className="btn btn-light">
              map
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(() => {})(Map);

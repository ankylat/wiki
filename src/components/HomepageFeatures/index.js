import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '8 kingdoms',
    description: <>Each one representing a unique aspect of yourself.</>,
  },
  {
    title: 'Traits as Personality',
    description: (
      <>
        Anky is a celebration to the beginning of an era: AI fueled creativity.
        Each character's story was uniquely generated by chatGTP. Each image was
        uniquely generated with midjourney.
      </>
    ),
  },
  {
    title: 'Worldbuilding',
    description: <>The Ankyverse is waking up. Are you?</>,
  },
];

function Feature({ image, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

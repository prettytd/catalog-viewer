import React, { useState } from 'react';

import { image1, image2, image3, image4 } from './assets/images';
import { Thumbs, Viewer } from './components';

const title = 'Catalog Viewer';

export function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1,
    },
    {
      thumb: image2,
      image: image2,
    },
    {
      thumb: image3,
      image: image3,
    },
    {
      thumb: image4,
      image: image4,
    },
  ];

  const [catalogs] = useState([...catalogsList]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideTimer, setSlideTimer] = useState(null);
  const [slideDuration] = useState(3000);
  const [checkedTimer, setCheckedTimer] = useState(false);

  const handleSetActiveIndex = (idx) => {
    setActiveIndex(idx);
  };

  const updateActiveIndexBy = (d) => {
    setActiveIndex((prev) => (prev + d + 4) % 4);
  };

  const handleCheckedTimerClick = () => {
    const next = !checkedTimer;

    if (next) {
      setSlideTimer(
        setInterval(() => {
          updateActiveIndexBy(1);
        }, slideDuration)
      );
    } else {
      slideTimer && clearInterval(slideTimer);
    }

    setCheckedTimer(next);
  };

  return (
    <>
      <div className="layout-column justify-content-center mt-75">
        <div className="layout-row justify-content-center">
          <div className="card pt-25">
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className="layout-row justify-content-center align-items-center mt-20">
              <button
                className="icon-only outlined"
                data-testid="prev-slide-btn"
                onClick={() => updateActiveIndexBy(-1)}
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                currentIndex={activeIndex}
                handleSetActiveIndex={handleSetActiveIndex}
              />
              <button
                className="icon-only outlined"
                data-testid="next-slide-btn"
                onClick={() => updateActiveIndexBy(1)}
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className="layout-row justify-content-center mt-25">
          <input
            type="checkbox"
            data-testid="toggle-slide-show-button"
            checked={checkedTimer}
            onClick={handleCheckedTimerClick}
            readOnly
          />
          <label className="ml-6">Start Slide Show</label>
        </div>
      </div>
    </>
  );
}

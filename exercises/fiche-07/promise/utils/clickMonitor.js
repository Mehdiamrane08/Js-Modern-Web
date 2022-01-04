const clickMonitor = (clicNumberThreshold, timeLimit, tagName = "BUTTON") => {
  let timer;
  let numberOfClicks = 0;
  let time1stClick;
  let timeLastClick;
  return new Promise((resolve, reject) => {
    const onClick = (e) => {
      // Only deal with click on a button
      if (e.target.tagName == tagName) {        
        ++numberOfClicks;
        if (numberOfClicks === 1) {
          time1stClick = performance.now();
          timer = setTimeout(() => {
            window.removeEventListener("click", onClick);
            // reject the promise;
            reject(
              `You did not click ${clicNumberThreshold} times on ${tagName} tag(s) within the ${timeLimit}s time limit`
            );
          }, timeLimit * 1000);
        } else if (numberOfClicks === clicNumberThreshold) {
          clearTimeout(timer);
          timeLastClick = performance.now();
          const timeElapsed = Math.round((timeLastClick - time1stClick) / 1000);
          resolve(
            `You clicked ${clicNumberThreshold} times on ${tagName} tag(s) within the ${timeLimit}s time limit : (you took ${timeElapsed}s !)`
          );
        }
      }
    };
    window.addEventListener("click", onClick);
  });
};

export default clickMonitor;

import React, { Component, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages (如果不要跳轉頁面，顯示在frame裏面的話，不要加route在這邊)
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const LineNotify = React.lazy(() => import("./views/pages/Line/LineNotify"));

// https://ithelp.ithome.com.tw/articles/10251342
// Suspense是當「目標載入元件」還沒載入完成時(lazy元件)
// React會顯示fallback這個props綁定的「讀取元件」
// 一直到「目標載入元件」載入完成後再切換過來。
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/Line" name="LineNotify" element={<LineNotify />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    );
  }
}

export default App;

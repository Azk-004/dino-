import { useEffect, useState } from "react";

export default function Toast({ toast }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast || !toast.id) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 4600);
    return () => clearTimeout(t);
  }, [toast?.id]);

  return <div id="ui-toast" className={visible ? "show" : ""}>{toast?.text || ""}</div>;
}

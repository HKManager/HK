package Event;

public class EventData {
        public String handle ;
        public String view ;
        public String data ;
        public Object value ;

        public void SetHandle(String pHandle) {
        this.handle = pHandle;
    }

        public String GetHandler() {
        return this.handle;
    }

        public void SetView(String pView) {
        this.view = pView;
    }

        public String GetView() {
        return this.view;
    }

        public void SetData(String pData) {
        this.data = pData;
    }

        public String GetData() {
        return this.data;
    }

        public void SetValue(Object pValue) {
        this.value = pValue;
    }

        public Object GetValue() {
        return this.value;
    }
}

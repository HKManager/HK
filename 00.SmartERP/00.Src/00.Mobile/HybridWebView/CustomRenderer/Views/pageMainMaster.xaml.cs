using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace CustomRenderer.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class pageMainMaster : ContentPage
    {
        public ListView ListView;

        public pageMainMaster()
        {
            InitializeComponent();

            BindingContext = new pageMainMasterViewModel();
            ListView = MenuItemsListView;
        }

        class pageMainMasterViewModel : INotifyPropertyChanged
        {
            public ObservableCollection<pageMainMenuItem> MenuItems { get; set; }

            public pageMainMasterViewModel()
            {
                MenuItems = new ObservableCollection<pageMainMenuItem>(new[]
                {
                    new pageMainMenuItem { Id = 0, Title = "거래처관리", TargetType = typeof(page거래처관리) },
                    new pageMainMenuItem { Id = 1, Title = "Page 2" },
                    new pageMainMenuItem { Id = 2, Title = "Page 3" },
                    new pageMainMenuItem { Id = 3, Title = "Page 4" },
                    new pageMainMenuItem { Id = 4, Title = "Page 5" },
                });
            }

            #region INotifyPropertyChanged Implementation
            public event PropertyChangedEventHandler PropertyChanged;
            void OnPropertyChanged([CallerMemberName] string propertyName = "")
            {
                if (PropertyChanged == null)
                    return;

                PropertyChanged.Invoke(this, new PropertyChangedEventArgs(propertyName));
            }
            #endregion
        }
    }
}
export class PagerService {
    limmit = 10;

    setPageLimit(count: number) {

        this.limmit = count;
        // alert("complete");

    }

    getPager(totalItems: number, currentPage: number = 1, pageSize: number= this.limmit) {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes

        const startIndex: number = (currentPage - 1) * pageSize;

        // alert(startIndex+"page Size"+pageSize+"totl"+totalItems);

        // alert(startIndex + pageSize - 1);

        const start: number = Number(startIndex) + Number(pageSize) - 1;
        // alert(start);

        const endIndex = Math.min(start, totalItems - 1);


        // alert("end Index"+endIndex)

        // create an array of pages to ng-repeat in the pager control
        const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}
